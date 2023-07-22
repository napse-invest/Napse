import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import Login from '../views/Auth/Login'

const AppRoutes = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
