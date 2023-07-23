// React
import { FC } from 'react'

// Router
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

// Components
import PageLogin from 'src/renderer/src/views/Auth/Login'
import PageInstances from 'src/renderer/src/views/Instances'
import Redirect from 'src/renderer/src/views/Redirect'

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/instances" element={<PageInstances />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
