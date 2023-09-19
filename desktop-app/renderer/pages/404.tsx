import Error from 'next/error'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'

export default function Custom404(): JSX.Element {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col">
      <Button
        className="h-10 w-32"
        variant="ghost"
        onClick={() => {
          router.push('/').catch((err) => {
            console.error(err)
          })
        }}
      >
        <p className="text-sm font-medium">Return Home</p>
      </Button>
      <Error statusCode={404} />
    </div>
  )
}
