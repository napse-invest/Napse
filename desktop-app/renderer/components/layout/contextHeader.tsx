import HeaderPopover from '@/components/custom/headerPopover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { ThemeButton } from '../custom/themeButton'
import { useSelector } from 'react-redux'
import type { RootStateType } from '@/redux/store'

export default function ContextHeader({
  children,
  isServer = false,
  isExchangeAccount = false,
  isSpace = false,
  isFleet = false,
  isBot = false
}: {
  children: ReactNode
  isServer?: boolean
  isExchangeAccount?: boolean
  isSpace?: boolean
  isFleet?: boolean
  isBot?: boolean
}): JSX.Element {
  isServer = isServer || isExchangeAccount || isSpace || isFleet || isBot
  isExchangeAccount = isExchangeAccount || isSpace || isFleet || isBot
  isSpace = isSpace || isFleet || isBot
  isFleet = isFleet || isBot
  const router = useRouter()
  const { spaceNames } = useSelector(
    (state: RootStateType) => state.headerState
  )
  // Define type in the store
  const { serverName, serverUrl } = useSelector(
    (state: RootStateType) => state.serverState
  )
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
            <Image src="/images/logo.svg" alt="Napse Logo" fill priority />
          </Button>
          <Separator className="relative h-2/3" orientation="vertical" />
        </div>
        <div className="flex w-full justify-start space-x-2">
          {isExchangeAccount && (
            <HeaderPopover
              title="Exchange Accounts"
              route="/exchangeAccounts"
            />
          )}
          {isSpace && (
            <HeaderPopover title="Spaces" route="/spaces" names={spaceNames} />
          )}
          {isFleet && <HeaderPopover title="Fleets" route="/fleets" />}
          {isBot && <HeaderPopover title="Bots" route="/bots" />}
        </div>
        <div className="flex  justify-start space-x-2">
          {isServer && (
            <HeaderPopover
              title={serverName}
              route="/servers"
              names={['AWS - Tom JEANNESSON', serverUrl]}
            />
          )}
          <ThemeButton />
        </div>
      </div>
      <Separator className="h-[1px]" />
      <div>{children}</div>
    </>
  )
}
