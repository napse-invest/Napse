import { BaseFleet, Fleet, createFleet } from '@/api/fleets/fleets'
import { NapseSpace, listSpace } from '@/api/spaces/spaces'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import CustomForm from '@/components/custom/selectedObject/inputs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { PlusIcon } from '@radix-ui/react-icons'
import * as z from 'zod'

const defaultFleet: BaseFleet = {
  name: 'My Fleet',
  space: 'dfe898aa-9aef-40ab-a02c-cb2b6ef9f108',
  clusters: [
    {
      template_bot: '3cebf81a-8f65-4520-b6eb-4b7bfbc2c921',
      share: 0.7,
      breakpoint: 1000,
      autoscale: false
    },
    {
      template_bot: '3cebf81a-8f65-4520-b6eb-4b7bfbc2c921',
      share: 0.3,
      breakpoint: 1000,
      autoscale: false
    }
  ]
}

export default function CreateFleetDialog({
  fleets,
  setFleets,
  disabledButton
}: {
  fleets: Fleet[]
  setFleets: Dispatch<SetStateAction<Fleet[]>>
  disabledButton?: boolean
}): JSX.Element {
  const searchParams = useSearchParams()
  const [possibleSpaces, setPossibleSpaces] = useState<NapseSpace[]>([])
  const [fleet, setFleet] = useState<BaseFleet>(defaultFleet)

  useEffect(() => {
    const fetchPossibleSpaces = async () => {
      try {
        const response = await listSpace(searchParams)
        setPossibleSpaces(response.data)
      } catch (error) {
        console.error(error)
        setPossibleSpaces([])
      }
    }
    if (searchParams.get('server')) {
      fetchPossibleSpaces()
    }
  }, [searchParams])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={'h-32 w-80'}
          disabled={disabledButton}
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Add new
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Fleet</DialogTitle>
          <DialogDescription>
            Add a new fleet will allow you to setup bots & invest on them.
          </DialogDescription>
        </DialogHeader>
        <CustomForm<BaseFleet>
          inputs={[
            {
              label: 'Name',
              key: 'name',
              type: 'input',
              zod: z.string(),
              default: defaultFleet.name
            },
            {
              label: 'Exchange',
              key: 'space',
              // type: 'select',
              // possibilities: possibleSpaces,
              type: 'input',
              zod: z.string(),
              default: defaultFleet.space
            }
            // TODO: add & custom clusters
          ]}
          onSubmit={async (value) => {
            try {
              const response = await createFleet(searchParams, {
                ...defaultFleet,
                ...value
              })
              setFleets([...fleets, response.data])
              document.getElementById('close-dialog')?.click()
            } catch (error) {
              console.error(error)
            }
            console.log('fleets', fleets)
          }}
          buttonDescription="Create"
        />
      </DialogContent>
    </Dialog>
  )
}
