import ContextHeader from '@/components/layout/contextHeader'
import { useRouter } from 'next/router'

export default function ExchangeAccount(): JSX.Element {
  const router = useRouter()
  return (
    <ContextHeader isBot>
      <h1>Exchange Account {router.query.slug}</h1>
    </ContextHeader>
  )
}
