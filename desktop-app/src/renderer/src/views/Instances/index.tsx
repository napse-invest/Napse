// React
import { FC, useEffect, useState } from 'react'

// Mui
import { Button } from '@mui/material'

// Router
import { useNavigate } from 'react-router-dom'

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

const PageInstances: FC = () => {
  const navigate = useNavigate()

  const [selectedSupplier, setSelectedSupplier] = useState(
    localStorage.getItem('selected-supplier') || ''
  )

  const [instances, setInstances] = useState<
    {
      id: string
      name: string
    }[]
  >([])

  useEffect(() => {
    localStorage.setItem('selected-supplier', selectedSupplier)

    // Fetch instances related to the selected supplier
    const fetchInstances = async (): Promise<void> => {
      console.log('D09D0239')
      setInstances(
        [...Array(Math.floor(Math.random() * 10))].map((_, index) => ({
          id: index.toString(),
          name: `Instance ${index}`
        }))
      )
    }
    fetchInstances()
  }, [selectedSupplier])

  const newInstance = (): void => {
    navigate('/instances/new')
  }

  return (
    <div>
      <SupplierSelector
        suppliers={suppliers}
        selectedSupplier={selectedSupplier}
        setSelectedSupplier={setSelectedSupplier}
      />
      <InstancesList instances={instances} />
      <Button onClick={newInstance} fullWidth>
        Add new instance
      </Button>
    </div>
  )
}

export default PageInstances
