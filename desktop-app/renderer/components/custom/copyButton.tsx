import { CheckIcon, CopyIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  src?: string
  copyTrigger: () => void
}

export async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value)
}

export default function CopyButton({
  value,
  className,
  src,
  copyTrigger,
  ...props
}: CopyButtonProps): JSX.Element {
  const theme = useTheme()
  const [hasCopied, setHasCopied] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn('bg-foreground relative z-10 h-6 w-6 ', className)}
      onClick={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
        copyTrigger()
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <CheckIcon className="h-3 w-3" color="background" />
      ) : (
        <CopyIcon className="h-3 w-3" color="background" />
      )}
    </Button>
  )
}
