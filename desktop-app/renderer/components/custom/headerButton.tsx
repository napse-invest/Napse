import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'

export default function HeaderButton({
  title,
  route
}: {
  title: string
  route: string
}): JSX.Element {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.push(`${route}`).catch((err) => {
          console.error(err)
        })
      }}
      variant="ghost"
    >
      {title}
    </Button>
  )
}
