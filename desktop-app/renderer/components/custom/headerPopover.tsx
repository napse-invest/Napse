import { Button } from '@/components/ui/button'
import { standardUrlPartial } from '@/lib/queryParams'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export default function ServerPopover(): JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Button
      variant={'ghost'}
      onClick={() =>
        router
          .push(
            standardUrlPartial(
              `/servers/`,
              null,
              {
                server: 'server.name',
                exchangeAccount: '',
                space: '',
                fleet: '',
                bot: ''
              },
              searchParams
            )
          )
          .catch((err) => {
            console.error(err)
          })
      }
    >
      Servers
    </Button>
  )
}
