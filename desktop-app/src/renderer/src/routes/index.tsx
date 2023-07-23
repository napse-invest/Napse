// React
import { FC } from 'react'

// Router
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

// Components
import Login from 'src/renderer/src/views/Auth/Login'
import Redirect from 'src/renderer/src/views/Redirect'

const AppRoutes: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instances" element={<div>Instances</div>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
