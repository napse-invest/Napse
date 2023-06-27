// React
import React from 'react'

// Components
import Navbar from './Navbar'

// Mui
import { Box } from '@mui/material'

const NAVBAR_HEIGHT = '40px'

interface Props {
  children: React.ReactNode
}

const MainLayout = (props: Props): JSX.Element => {
  const { children } = props
  return (
    <Box
      sx={{
        paddingTop: NAVBAR_HEIGHT
      }}
    >
      <Navbar height={NAVBAR_HEIGHT} />
      {children}
    </Box>
  )
}

export default MainLayout
