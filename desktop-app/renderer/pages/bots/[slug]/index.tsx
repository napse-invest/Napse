import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'

export default function Bot(): JSX.Element {
  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Your Bots'}
        description={
          'Bots look to make your money grow while you do something else.'
        }
      >
        <></>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
