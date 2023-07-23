// React
import { FC } from 'react'

// Router
import { Route, Routes } from 'react-router-dom'

// Components
import PageInstances from 'src/renderer/src/views/Instances'
import PageNewSupplier from 'src/renderer/src/views/Suppliers/NewSupplier'

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/instances" element={<PageInstances />} />
      <Route path="/suppliers/new" element={<PageNewSupplier />} />
    </Routes>
  )
}

export default AuthRoutes
