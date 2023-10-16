import { Key } from '@/api/key/key'
import ContextHeader from '@/components/layout/contextHeader'
import KeyGeneralAttributes from './keyGeneralAttributes'
import KeyPermissions from './keyPermissions'

const defaultKey: Key = {
  name: '',
  prefix: '',
  permissions: [],
  is_master_key: false,
  revoked: false,
  description: ''
}

export default function Key(): JSX.Element {
  return (
    <ContextHeader isBot isBreadcrumb={false}>
      <div className="container mt-12 space-y-6 align-middle">
        <div className="container mt-12 space-y-6 align-middle">
          <h1 className="text-5xl font-bold leading-tight tracking-tighter">
            Settings - Key
          </h1>
          <p className="text-xl">
            Here is where you can manage your distibuted API keys.
          </p>
        </div>
        <div className="flex flex-row space-x-10">
          <KeyGeneralAttributes />
          <KeyPermissions />
        </div>
      </div>
    </ContextHeader>
  )
}
