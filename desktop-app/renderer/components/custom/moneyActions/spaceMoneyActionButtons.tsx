import { RetrievedNapseSpace } from '@/api/spaces/spaces'
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

interface SpaceMoneyActionButtonsProps {
  space: RetrievedNapseSpace
}

export default function SpaceMoneyActionButtons({
  space
}: {
  space: RetrievedNapseSpace
}): JSX.Element {
  const { toast } = useToast()
  console.log('space', space)

  return (
    <>
      {space.testing && (
        <div className="flex flex-row gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button variant="outline" size="icon" onClick={() => {}}>
                    <ArrowDownOnSquareIcon
                      className="h-6 w-6"
                      strokeWidth={1.2}
                    />
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
              <TooltipTrigger asChild>
                <div>
                  <Button variant="outline" size="icon" onClick={() => {}}>
                    <ArrowUpOnSquareIcon
                      className="h-6 w-6"
                      strokeWidth={1.2}
                    />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Withdraw</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
      {!space.testing && (
        <div className="flex flex-row gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      toast({
                        title: 'Withdraw real money',
                        description: 'You cannot withdraw real money yet.',
                        variant: 'destructive'
                      })
                    }}
                  >
                    <ArrowDownOnSquareIcon
                      className="h-6 w-6"
                      strokeWidth={1.2}
                    />
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
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      toast({
                        title: 'Withdraw real money',
                        description: 'You cannot withdraw real money yet.',
                        variant: 'destructive'
                      })
                    }}
                  >
                    <ArrowUpOnSquareIcon
                      className="h-6 w-6"
                      strokeWidth={1.2}
                    />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Withdraw</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </>
  )
}
