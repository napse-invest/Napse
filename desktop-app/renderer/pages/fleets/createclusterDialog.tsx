import { Bot, listFreeBot } from '@/api/bots/bots'
import { Cluster } from '@/api/fleets/fleets'
import CustomForm from '@/components/custom/selectedObject/inputs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { DialogClose } from '@radix-ui/react-dialog'
import { PlusIcon } from '@radix-ui/react-icons'

import { useToast } from '@/components/ui/use-toast'
import { BaseNapseSpace } from 'api/spaces/spaces'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const defaultSpace: BaseNapseSpace = {
  name: 'My Space',
  description: 'My Space Description',
  exchangeAccount: '7bdd866e-f2a2-4ea9-a01e-02ddb77a80fe',
  testing: true
}
export default function CreateClusterDialog({
  clusters,
  setClusters
}: {
  clusters: Cluster[]
  setClusters: React.Dispatch<React.SetStateAction<Cluster[]>>
}) {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [possibleTemplateBots, setpossibleTemplateBots] = useState<Bot[]>([])

  useEffect(() => {
    const fetchPossibleTemplateBot = async () => {
      try {
        const response = await listFreeBot(searchParams)
        setpossibleTemplateBots(response.data)
      } catch (error) {
        console.error(error)
        setpossibleTemplateBots([])
      }
    }
    if (searchParams.get('server')) {
      fetchPossibleTemplateBot()
    }
  }, [searchParams])

  const BotPossibilitiesSelection = possibleTemplateBots
    ? possibleTemplateBots.reduce(
        (obj, item) => {
          obj[item.uuid] = item.name
          return obj
        },
        {} as { [key: string]: string }
      )
    : {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <PlusIcon className="mr-2" />
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add a new Bot</DialogTitle>
          <DialogDescription>
            Theses settings will tell to the fleet how to manage the bot
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-5">
          <div></div>
          <Separator className="col-span-3 my-8" />
          <div></div>
        </div>
        <CustomForm<Cluster>
          inputs={[
            {
              label: 'Bot',
              key: 'templateBot',
              type: 'select',
              possibilities: BotPossibilitiesSelection,
              zod: z.string(),
              default: Object.keys(BotPossibilitiesSelection)[0],
              placeholder: 'Select a bot'
            },
            {
              label: 'Share',
              key: 'share',
              type: 'slider',
              zod: z.number(),
              default: 50,
              sliderSettings: {
                min: 0,
                max: 100,
                step: 1
              }
            },
            {
              label: 'Breakpoint',
              key: 'breakpoint',
              type: 'input',
              zod: z.number(),
              default: 1000,
              placeholder: 1000
            },
            {
              label: 'Auto Scaling',
              key: 'autoscale',
              type: 'switch',
              zod: z.boolean(),
              default: false,
              disabled: true
            }
          ]}
          onSubmit={async (values) => {
            // Make the sum of all share mapped on clusters
            let acc = 0
            clusters.map((cluster) => {
              acc += cluster.share
            })
            const accTotal = acc + values.share / 100
            if (accTotal > 1) {
              toast({
                title: 'The sum of all share must be equal to 100 %',
                description:
                  'You have only ' + ((1 - acc) * 100).toFixed(2) + ' % left',
                variant: 'destructive'
              })
              return
            }

            const newCluster: Cluster = {
              templateBot: possibleTemplateBots.find(
                (bot) => bot.uuid === values.templateBot
              ) as Bot,
              share: parseFloat((values.share / 100).toFixed(2)),
              breakpoint: values.breakpoint,
              autoscale: values.autoscale
            }
            setClusters([...clusters, newCluster])
            document.getElementById('close-cluster-button')?.click()
            toast({
              title: 'Cluster created',
              description: newCluster.templateBot.name + "'s cluster created"
            })
          }}
          buttonDescription="Done"
        />
      </DialogContent>
      <DialogClose id="close-cluster-button" />
    </Dialog>
  )
}
