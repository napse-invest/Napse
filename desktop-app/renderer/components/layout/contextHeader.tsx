import type { ReactNode } from 'react'
import HeaderPopover from '@/components/ui/headerPopover'
import { Separator } from '@/components/ui/separator'
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

  return (
    <>
      <div className="flex items-center justify-between">
        {isProvider && <HeaderPopover />}
        <Separator orientation="vertical" />
        {isExchangeAccount && <HeaderPopover />}
        {isSpace && <HeaderPopover />}
        {isFleet && <HeaderPopover />}
        {isBot && <HeaderPopover />}
      </div>
      <main>{children}</main>
    </>
  )
}
