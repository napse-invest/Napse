import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon
} from '@heroicons/react/24/outline'

export default function MoneyActionButtons(): JSX.Element {
  const { toast } = useToast()
  return (
    <div className="flex flex-row gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  toast({
                    title: 'Deposit',
                    description: 'You have deposited money !'
                  })
                }}
              >
                <ArrowUpOnSquareIcon className="w-6 h-6" strokeWidth={1.2} />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deposit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  toast({
                    title: 'Withdraw',
                    description: 'You have withdrawn money !'
                  })
                }}
              >
                <ArrowDownOnSquareIcon className="w-6 h-6" strokeWidth={1.2} />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Withdraw</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
