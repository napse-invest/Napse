import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button, ClosePopover } from '@/components/ui/button'
import type { ButtonProps } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import type { RootStateType } from '@/redux/store'
import {
  SET_TAB,
  SET_NAME,
  SET_CONTAINER_STATE
} from '@/redux/reducers/headerStateSlice'

export default function HeaderPopover({
  title,
  route,
  names = []
}: {
  title: string
  route: string
  names?: string[]
}): JSX.Element {
  const router = useRouter()
  const dispatch = useDispatch()
  const { tab, name, isContainerMode } = useSelector(
    (state: RootStateType) => state.headerState
  )
  const buttonProps: ButtonProps = {
    variant: 'ghost',
    className: 'w-full'
  }
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={tab === title ? 'secondary' : 'ghost'}>
            {title}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-col items-center space-y-3">
            {tab === title && !isContainerMode ? (
              <ClosePopover {...buttonProps}>All {title}</ClosePopover>
            ) : (
              <Button
                onClick={(e) => {
                  router.push(route).catch((err) => {
                    console.error(err)
                  })
                  dispatch(SET_CONTAINER_STATE(false))
                  dispatch(SET_TAB(title))
                  dispatch(SET_NAME(''))
                }}
                {...buttonProps}
              >
                All {title}
              </Button>
            )}
            <Separator orientation="horizontal" />
            <div className="w-full text-start">
              {names.length > 0 ? `Specific ${title}:` : `No ${title} found`}
            </div>
            {names.map((currentName, index) => {
              console.log(name, currentName)
              return (
                <div key={index}>
                  {name === currentName ? (
                    <ClosePopover {...buttonProps} variant="secondary">
                      {currentName}
                    </ClosePopover>
                  ) : (
                    <Button
                      onClick={() => {
                        router.push(`${route}/${currentName}`).catch((err) => {
                          console.error(err)
                        })
                        dispatch(SET_CONTAINER_STATE(true))
                        dispatch(SET_TAB(title))
                        dispatch(SET_NAME(currentName))
                      }}
                      {...buttonProps}
                    >
                      {currentName}
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
