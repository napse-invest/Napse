// React
import { FC, useEffect } from 'react'

// Router
import { useNavigate } from 'react-router-dom'

const Redirect: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('is-logged') === 'true') {
      navigate('/instances')
    } else {
      navigate('/login')
    }
  }, [])

  return <div></div>
}

export default Redirect
