// React
import { FC } from 'react'

// Router
import { Route, Routes } from 'react-router-dom'

// Components
import PageInstances from 'src/renderer/src/views/Instances'
import PageNewInstance from 'src/renderer/src/views/Instances/NewInstance'
import PageNewSupplier from 'src/renderer/src/views/Suppliers/NewSupplier'

// Layout
import MainLayout from 'src/renderer/src/layouts/MainLayout'

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route
        path="/instances"
        element={
          <MainLayout>
            <PageInstances />
          </MainLayout>
        }
      />
      <Route
        path="/instances/new"
        element={
          <MainLayout>
            <PageNewInstance />
          </MainLayout>
        }
      />
      <Route
        path="/suppliers/new"
        element={
          <MainLayout>
            <PageNewSupplier />
          </MainLayout>
        }
      />
    </Routes>
  )
}

export default AuthRoutes
