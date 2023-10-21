import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export default function Spaces(): JSX.Element {
  const searchParams = useSearchParams()
  const router = useRouter()
  // const [Spaces, setSpaces] = useState<>

  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Your spaces'}
        description={
          'Here is an overview of all your spaces. A space make it easy to manage your money.'
        }
      >
        <></>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
