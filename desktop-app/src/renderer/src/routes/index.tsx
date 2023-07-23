import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import Login from '../views/Auth/Login'
import Redirect from '../views/Redirect'

const AppRoutes = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
