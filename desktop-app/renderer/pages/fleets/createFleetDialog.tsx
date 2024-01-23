import { BaseFleet, Fleet } from '@/api/fleets/fleets'
import { NapseSpace, listSpace } from '@/api/spaces/spaces'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { PlusIcon } from '@radix-ui/react-icons'

const defaultFleet: BaseFleet = {
  name: 'My Fleet',
  space: 'dfe898aa-9aef-40ab-a02c-cb2b6ef9f108',
  clusters: [
    {
      template_bot: '063873d9-569d-473f-b1fd-b4bda7b0f37b',
      share: 0.7,
      breakpoint: 1000,
      autoscale: false
    },
    {
      template_bot: '063873d9-569d-473f-b1fd-b4bda7b0f37b',
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

  const SpacePossibilitiesSelection = possibleSpaces.reduce(
    (obj, item) => {
      obj[item.name] = item.uuid
      return obj
    },
    {} as { [key: string]: string }
  )

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
      {/* <DialogContent className="sm:max-w-[425px]"> */}
      {/* <DialogContent className="max-w"> */}
      <DialogContent className="w-full">
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem>
              <DialogHeader className="">
                <DialogTitle>Add a new Fleet</DialogTitle>
                <DialogDescription>
                  Add a new fleet will allow you to setup bots & invest on them.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-5">
                <div></div>
                <Separator className="col-span-3 mb-6 mt-8" />
                <div></div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <p>prout</p>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
      <DialogClose id="close-button" />
    </Dialog>
  )
}
