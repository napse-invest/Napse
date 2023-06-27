// React
import React from 'react'

// Mui
import { Box } from '@mui/material'

interface Props {
  children: React.ReactNode
}

const MainLayout = (props: Props): JSX.Element => {
  const { children } = props
  return <Box>{children}</Box>
}

export default MainLayout
