import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { useRouter } from 'next/router'

export function SettingsButton(): JSX.Element {
  const router = useRouter()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        router.push('/settings').catch((err) => {
          console.error(err)
        })
      }}
    >
      <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
    </Button>
  )
}
