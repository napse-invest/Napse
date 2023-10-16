import HeaderButton from '@/components/custom/headerButton'
import ServerPopover from '@/components/custom/headerPopover'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState, type ReactNode } from 'react'
import { ThemeButton } from '../custom/themeButton'

import BreadcrumbLayout from '@/components/layout/breadcrumb'
import { standardUrlPartial } from '@/lib/queryParams'
import { useTheme } from 'next-themes'
import { useSearchParams } from 'next/navigation'
import { SettingsButton } from '../custom/settingsButton'

export default function ContextHeader({
  children,
  isBreadcrumb = true,
  isServer = false,
  isExchangeAccount = false,
  isSpace = false,
  isFleet = false,
  isBot = false
}: {
  children: ReactNode
  isBreadcrumb?: boolean
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
  const searchParams = useSearchParams()
  const theme = useTheme()
  const [imageSrc, setImageSrc] = useState<string>(
    '/images/NapseInvest-Logo-Light.svg'
  )
  useEffect(() => {
    if (theme.resolvedTheme === 'dark') {
      setImageSrc('/images/NapseInvest-Logo-Light.svg')
    } else {
      setImageSrc('/images/NapseInvest-Logo-Dark.svg')
    }
  }, [theme.resolvedTheme])
  return (
    <>
      <div className="container flex h-20 flex-row items-center justify-between space-y-0 py-4 px-[12px]">
        <div className="flex h-16 flex-row items-center justify-start space-x-12 pr-8">
          <Button
            variant={'ghost'}
            className="hover:bg-transparent"
            tabIndex={-1}
            onClick={() => {
              router.push('/').catch((err) => {
                console.error(err)
              })
            }}
          >
            <Image
              src={imageSrc}
              alt="Napse logo"
              fill={false}
              width={300}
              height={300}
              priority
            />
          </Button>
          <Separator className="relative h-2/3" orientation="vertical" />
        </div>
        <div className="flex w-full justify-start space-x-6">
          {isExchangeAccount && (
            <HeaderButton
              title="Exchange Accounts"
              route={standardUrlPartial(
                '/exchangeAccounts/',
                null,
                { exchangeAccount: '', space: '', fleet: '', bot: '' },
                searchParams
              )}
            />
          )}
          {isSpace && (
            <HeaderButton
              title="Spaces"
              route={standardUrlPartial(
                '/spaces/',
                null,
                { exchangeAccount: '', space: '', fleet: '', bot: '' },
                searchParams
              )}
            />
          )}
          {isFleet && (
            <HeaderButton
              title="Fleets"
              route={standardUrlPartial(
                '/fleets/',
                null,
                { exchangeAccount: '', space: '', fleet: '', bot: '' },
                searchParams
              )}
            />
          )}
          {isBot && (
            <HeaderButton
              title="Bots"
              route={standardUrlPartial(
                '/bots/',
                null,
                { exchangeAccount: '', space: '', fleet: '', bot: '' },
                searchParams
              )}
            />
          )}
        </div>
        <div className="flex justify-start space-x-2">
          {isServer && <ServerPopover />}
          <ThemeButton />
          <SettingsButton />
        </div>
      </div>
      <Separator className="h-[1px]" />
      {isBreadcrumb && <BreadcrumbLayout />}

      <div>{children}</div>
    </>
  )
}
