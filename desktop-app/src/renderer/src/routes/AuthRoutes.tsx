// React
import { FC } from 'react'

// Router
import { Route, Routes } from 'react-router-dom'

// Components
import PageLogin from 'src/renderer/src/views/Auth/Login'
import Redirect from 'src/renderer/src/views/Redirect'

const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Redirect />} />
      <Route path="/login" element={<PageLogin />} />
    </Routes>
  )
}

export default AuthRoutes
