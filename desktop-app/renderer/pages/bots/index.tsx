import React from 'react'
import ContextHeader from '@/components/layout/contextHeader'

import { Button } from '@/components/ui/button'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export default function Bots(): JSX.Element {
  const { toast } = useToast()
  return (
    <ContextHeader isBot>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up ',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            )
          })
        }}
      >
        Add to calendar
      </Button>
    </ContextHeader>
  )
}
