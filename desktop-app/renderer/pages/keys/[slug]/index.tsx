import ContextHeader from '@/components/layout/contextHeader'
import DefaultPageLayout from '@/components/layout/defaultPageLayout'
import KeyGeneralAttributes from './keyGeneralAttributes'
import KeyPermissions from './keyPermissions'
export default function Key(): JSX.Element {
  return (
    <ContextHeader isBot>
      <DefaultPageLayout
        header={'Settings - Key'}
        description={'Here is where you can manage your distibuted API keys.'}
      >
        <div className="flex flex-row space-x-10">
          <KeyGeneralAttributes />
          <KeyPermissions />
        </div>
      </DefaultPageLayout>
    </ContextHeader>
  )
}
