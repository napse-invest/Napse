import { BaseFleet, Fleet } from '@/api/fleets/fleets'
import { NapseSpace, listSpace } from '@/api/spaces/spaces'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@radix-ui/react-dialog'
import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import { FieldValues, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Cluster } from '@/api/fleets/fleets'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import ClusterDataTable from './clusterDataTable'
import CreateClusterDialog from './createclusterDialog'

const FleetSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'You have to give a name.' })
    .max(64, { message: 'The name cannot exceed 64 characters.' }),
  space: z.string()
})

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
  const [fleet, setFleet] = useState<BaseFleet>()
  const [Clusters, setClusters] = useState<Cluster[]>([])
  useEffect(() => {
    console.log('searchParams::')
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

  const napseSpacePossibilitiesSelection = possibleSpaces.reduce(
    (obj, item) => {
      obj[item.name] = item.uuid
      return obj
    },
    {} as { [key: string]: string }
  )
  const defaultValues = {
    name: 'Fleet Name',
    space: Object.values(napseSpacePossibilitiesSelection)[0]
  }

  const defaultValues = {
    name: 'Fleet Name',
    space: Object.values(napseSpacePossibilitiesSelection)[0]
  }

  const form = useForm<z.infer<typeof FleetSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(FleetSchema),
    defaultValues: {
      name: 'Fleet Name',
      space: Object.values(napseSpacePossibilitiesSelection)[0] // why undifined ?
    }
  })
  console.log('form::', form)
  console.log('napse::', napseSpacePossibilitiesSelection)
  // useEffect(() => {
  //   form.reset({
  //     name: defaultValues.name,
  //     space: defaultValues.space
  //   })
  // }, [
  //   defaultValues.name,
  //   defaultValues.space,
  //   form,
  //   form.formState.isSubmitSuccessful
  // ])
  // function handleFleetSubmit({
  //   form,
  //   onSubmit
  // }: {
  //   form: UseFormReturn
  //   onSubmit: (values: z.infer<typeof FleetSchema>) => void
  // }) {
  //   form.handleSubmit(onSubmit)
  // }

  function onSubmitFleet(values: FieldValues) {
    console.log('Fleet submit triggered')
    console.log(FleetSchema)
    form.reset({
      name: 'Fleet Name',
      space: Object.values(napseSpacePossibilitiesSelection)[0]
    })
    setClusters([])
    document.getElementById('close-fleet-button')?.click()
  }

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
      <DialogContent className="">
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmitFleet)}
            className="space-y-2"
          >
            <Carousel className="">
              <CarouselContent>
                <CarouselItem className="">
                  <DialogHeader className="">
                    <DialogTitle>Add a new Fleet</DialogTitle>
                    <DialogDescription>
                      Add a new fleet will allow you to setup bots & invest on
                      them.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-5">
                    <div></div>
                    <Separator className="col-span-3 my-8" />
                    <div></div>
                  </div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mx-2 mb-5 flex flex-col space-y-1.5">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="fleet" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="space"
                    render={({ field }) => {
                      console.log(Object.getOwnPropertyDescriptors(field))
                      return (
                        <FormItem>
                          <div className="mx-2 mb-5 flex flex-col space-y-1.5">
                            <FormLabel>Space</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your space" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.entries(
                                  napseSpacePossibilitiesSelection
                                ).map(([name, value]) => (
                                  <SelectItem
                                    key={name}
                                    value={value}
                                    // disabled={false}
                                  >
                                    {name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </FormItem>
                      )
                    }}
                  />
                </CarouselItem>
                <CarouselItem>
                  <DialogHeader className="">
                    <DialogTitle>Add clusters to your fleet</DialogTitle>
                    <DialogDescription>
                      Clusters will enable fleets to manage bots.
                    </DialogDescription>
                  </DialogHeader>

                  <ScrollArea className="mb-3 mt-8 h-44 w-full rounded-md border">
                    <ClusterDataTable data={Clusters} />
                  </ScrollArea>
                  <div className="flex flex-row justify-between">
                    <CreateClusterDialog
                      possibleTemplateBots={[]}
                      clusters={Clusters}
                      setClusters={setClusters}
                    />
                    <Button
                      type="submit"
                      onClick={form.handleSubmit(onSubmitFleet)}
                    >
                      Create
                    </Button>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </form>
        </Form>
      </DialogContent>
      <DialogClose id="close-fleet-button" />
    </Dialog>
  )
}
