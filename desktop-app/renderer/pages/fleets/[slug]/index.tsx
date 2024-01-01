import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'

export default function Fleet(): JSX.Element {
  // TODO: implement or move this file
  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Retrieved fleet'}
        description={
          'Here is an overview of all your fleets. A fleet fully manages the bots it owns.'
        }
      >
        <></>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
