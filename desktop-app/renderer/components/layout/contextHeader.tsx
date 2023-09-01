import HeaderPopover from '@/components/custom/headerPopover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { ThemeButton } from '../custom/themeButton'

export default function ContextHeader({
  children,
  isProvider = false,
  isExchangeAccount = false,
  isSpace = false,
  isFleet = false,
  isBot = false
}: {
  children: ReactNode
  isProvider?: boolean
  isExchangeAccount?: boolean
  isSpace?: boolean
  isFleet?: boolean
  isBot?: boolean
}): JSX.Element {
  isProvider = isProvider || isExchangeAccount || isSpace || isFleet || isBot
  isExchangeAccount = isExchangeAccount || isSpace || isFleet || isBot
  isSpace = isSpace || isFleet || isBot
  isFleet = isFleet || isBot
  const router = useRouter()
  return (
    <>
      <div className="container flex h-20 flex-row items-center justify-between space-y-0 py-4">
        <div className="flex h-16 flex-row items-center justify-start space-x-12 pr-8">
          <Button
            variant={'ghost'}
            className="relative h-16 w-16 rounded-full"
            onClick={() => {
              router.push('/').catch((err) => {
                console.error(err)
              })
            }}
          >
            <Image src="/images/logo.svg" alt="Napse Logo" fill />
          </Button>
          <Separator className="relative h-2/3" orientation="vertical" />
        </div>
        <div className="flex w-full justify-start space-x-2">
          {isProvider && (
            <>
              <HeaderPopover
                title="Providers"
                variant="button"
                onclick={() => {
                  router.push('/providers').catch((err) => {
                    console.error(err)
                  })
                }}
              />
              {/* <Separator className="h-10" orientation="vertical" /> */}
            </>
          )}

          {isExchangeAccount && (
            <>
              <HeaderPopover
                title="Exchange accounts"
                variant="button"
                onclick={() => {
                  router.push('/').catch((err) => {
                    console.error(err)
                  })
                }}
              />
              {/* <Separator className="h-10" orientation="vertical" /> */}
            </>
          )}
          {isSpace && (
            <>
              <HeaderPopover
                title="Spaces"
                variant="button"
                onclick={() => {
                  router.push('/spaces').catch((err) => {
                    console.error(err)
                  })
                }}
              />
              {/* <Separator className="h-10" orientation="vertical" /> */}
            </>
          )}
          {isFleet && (
            <>
              <HeaderPopover
                title="Fleets"
                variant="button"
                onclick={() => {
                  router.push('/').catch((err) => {
                    console.error(err)
                  })
                }}
              />
              {/* <Separator className="h-10" orientation="vertical" /> */}
            </>
          )}
          {isBot && (
            <HeaderPopover
              title="Bots"
              variant="button"
              onclick={() => {
                router.push('/').catch((err) => {
                  console.error(err)
                })
              }}
            />
          )}
        </div>
        <ThemeButton />
      </div>
      <Separator className="h-[1px]" />
      <div>{children}</div>
    </>
  )
}
