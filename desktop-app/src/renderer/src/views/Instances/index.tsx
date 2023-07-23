// React
import React from 'react'

// Components
import InstancesList from './InstancesList'

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

const PageInstances: React.FC = () => {
  return (
    <div>
      <InstancesList instances={instances} />
    </div>
  )
}

export default PageInstances
