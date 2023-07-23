// React
import { FC } from 'react'

// Router
import { HashRouter as Router } from 'react-router-dom'

// Components

// Routes
import AuthRoutes from './AuthRoutes'
import MainRoutes from './MainRoutes'

const AppRoutes: FC = () => {
  return (
    <Router>
      <AuthRoutes />
      <MainRoutes />
    </Router>
  )
}

export default AppRoutes
