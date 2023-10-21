import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { useToast } from '@/components/ui/use-toast'

import { useSearchParams } from 'next/navigation'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { standardUrlPartial } from '@/lib/queryParams'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction } from 'react'
import AllInputs from './inputs'

export interface InputType<T extends Object> {
  label: string
  key: keyof T
  type: 'input' | 'switch' | 'select'
  disabled?: boolean
  possibilities?: string[]
}

export default function SelectedObject<T extends Object>({
  children,
  objectName,
  objectIdentifier,
  object,
  setObject,
  updateOnClick,
  deleteOnClick,
  noAutoRouteOnDelete,
  inputs,
  childrenPosition
}: {
  children?: React.ReactNode
  objectName: string
  objectIdentifier: keyof T
  object: T
  setObject: Dispatch<SetStateAction<T>>
  updateOnClick?: () => void
  deleteOnClick?: () => void
  noAutoRouteOnDelete?: boolean
  inputs: InputType<T>[]
  childrenPosition?:
    | 'startHeader'
    | 'endHeader'
    | 'startFooter'
    | 'endFooter'
    | 'startContent'
    | 'endContent'
}): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()

  const { toast } = useToast()
  if (!object) {
    return <div>Loading</div>
  }
  return (
    <Card className="w-[450px]">
      <CardHeader>
        {childrenPosition === 'startHeader' && children}
        <CardTitle>Selected {objectName}:</CardTitle>
        <CardDescription>
          You can view/edit your {objectName.toLowerCase()} properties here.
        </CardDescription>
        {childrenPosition === 'endHeader' && children}
      </CardHeader>
      <CardContent>
        {childrenPosition === 'startContent' && children}
        <form>
          <div className="grid w-full items-center gap-4">
            <AllInputs
              inputs={inputs}
              object={object}
              setObject={setObject}
              objectName={objectName}
            />
          </div>
        </form>
        {childrenPosition === 'endContent' && children}
      </CardContent>
      <CardFooter className="flex justify-between">
        {childrenPosition === 'startFooter' && children}
        <Button
          onClick={async () => {
            if (!updateOnClick) return
            try {
              await updateOnClick()
            } catch (error) {
              console.error(error)
            }
            setObject({ ...object })
            toast({
              title: `Successfully edited ${objectName} !`,
              description: `${object[objectIdentifier]} updated`
            })
          }}
        >
          Update
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Deleteing an {objectName} will
                also delete all its children. Check the documentation for more
                information.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({ variant: 'destructive' })}
                onClick={async () => {
                  if (!deleteOnClick) return
                  await deleteOnClick()
                  toast({
                    title: `Successfully deleted ${objectName} !`,
                    description: `${object[objectIdentifier]} deleted`
                  })
                  if (noAutoRouteOnDelete) return
                  router
                    .push(
                      standardUrlPartial(
                        `/${router.pathname.split('/')[1]}`,
                        null,
                        {
                          exchangeAccount: '',
                          space: '',
                          fleet: '',
                          bot: ''
                        },
                        searchParams
                      )
                    )
                    .catch((err) => {
                      console.error(err)
                    })
                }}
              >
                Detete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {childrenPosition === 'endFooter' && children}
      </CardFooter>
    </Card>
  )
}
