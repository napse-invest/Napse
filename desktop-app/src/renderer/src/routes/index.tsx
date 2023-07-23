// React
import { FC } from 'react'

// Router
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

// Components
import PageLogin from 'src/renderer/src/views/Auth/Login'
import PageInstances from 'src/renderer/src/views/Instances'
import Redirect from 'src/renderer/src/views/Redirect'
import PageNewSupplier from 'src/renderer/src/views/Suppliers/NewSupplier'

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/instances" element={<PageInstances />} />
        <Route path="/suppliers/new" element={<PageNewSupplier />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
