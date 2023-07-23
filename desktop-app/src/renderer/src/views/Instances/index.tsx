// React
import { FC } from 'react'

// Components
import InstancesList from './InstancesList'
import SupplierSelector from './SupplierSelector'

const instances = [
  {
    id: '1',
    name: 'Instance 1'
  },
  {
    id: '2',
    name: 'Instance 2'
  }
]

const PageInstances: FC = () => {
  return (
    <div>
      <SupplierSelector />
      <InstancesList instances={instances} />
    </div>
  )
}

export default PageInstances
