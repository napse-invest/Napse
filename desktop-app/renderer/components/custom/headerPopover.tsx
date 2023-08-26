import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

export default function HeaderPopover({
  title,
  onclick = () => {},
  variant = 'popover'
}: {
  title: string
  onclick?: () => void
  variant?: 'popover' | 'button'
}): JSX.Element {
  return (
    <>
      {variant === 'button' && (
        <Button variant="ghost" onClick={onclick}>
          {title}
        </Button>
      )}
      {variant === 'popover' && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" onClick={onclick}>
              {title}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80"></PopoverContent>
        </Popover>
      )}
    </>
  )
}
