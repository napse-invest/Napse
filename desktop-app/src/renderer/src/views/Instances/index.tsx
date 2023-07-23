// React
import { FC, useState } from 'react'

// Components
import InstancesList from './InstancesList'
import SupplierSelector from './SupplierSelector'

const suppliers = [
  {
    id: '1',
    name: 'Supplier 1'
  },
  {
    id: '2',
    name: 'Supplier 2'
  }
]

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
  const [selectedSupplier, setSelectedSupplier] = useState(
    localStorage.getItem('selected-supplier') || ''
  )

  return (
    <div>
      <SupplierSelector
        suppliers={suppliers}
        selectedSupplier={selectedSupplier}
        setSelectedSupplier={setSelectedSupplier}
      />
      <InstancesList instances={instances} />
    </div>
  )
}

export default PageInstances
