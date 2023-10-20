import { Button } from '@/components/ui/button'
import Error from 'next/error'
import { useRouter } from 'next/router'

export default function Custom404(): JSX.Element {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col p-6">
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
      {/* <div className="p-6 text-sm">Full path: {router.asPath}</div> */}
      <Error statusCode={404} title={`This page could not be found.`} />
    </div>
  )
}
