import { Bot } from '@/api/bots/bots'
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

import { BaseNapseSpace } from 'api/spaces/spaces'
import { z } from 'zod'

const defaultSpace: BaseNapseSpace = {
  name: 'My Space',
  description: 'My Space Description',
  exchangeAccount: '7bdd866e-f2a2-4ea9-a01e-02ddb77a80fe'
}
export default function CreateClusterDialog({
  possibleTemplateBots
}: {
  possibleTemplateBots: Bot[]
}) {
  // if (possibleTemplateBots.length === 0) {
  //   return (
  //     <div className="text-center">
  //       <p>You must create a bot in the workshop</p>
  //       <p>before create a cluster</p>
  //     </div>
  //   )
  // }

  const BotPossibilitiesSelection = possibleTemplateBots.reduce(
    (obj, item) => {
      obj[item.name] = item.uuid
      return obj
    },
    {} as { [key: string]: string }
  )

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
          <DialogTitle>Add a new Cluster</DialogTitle>
          <DialogDescription>
            The cluster will tell to the fleet how to manage bots.
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
              default: Object.values(BotPossibilitiesSelection)[0],
              placeholder: 'Select a bot'
            },
            {
              label: 'Share',
              key: 'share',
              type: 'slider',
              possibilities: BotPossibilitiesSelection,
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
              zod: z.string(),
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
          onSubmit={async (values) => {}}
          buttonDescription="Create"
        />
      </DialogContent>
      <DialogClose id="close-button" />
    </Dialog>
  )
}
