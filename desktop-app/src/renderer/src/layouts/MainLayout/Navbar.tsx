// Mui
import { Stack, Box, IconButton } from '@mui/material'
import { grey } from '@mui/material/colors'

// Icons
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

// Assets
import logo from '../../assets/logo-napse-1.svg'

interface Props {
  height: string
}

const Navbar = (props: Props): JSX.Element => {
  const { height } = props

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: height,
        backgroundColor: grey[900]
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '8px',
          filter:
            'brightness(0) saturate(100%) invert(100%) sepia(44%) saturate(662%) hue-rotate(49deg) brightness(113%) contrast(96%)'
        }}
      >
        <img src={logo} alt="logo" style={{ height: '25px' }} />
      </Box>

      {/* Options + Logout */}
      <Stack direction="row" alignItems="center" sx={{ marginRight: '5px' }}>
        <IconButton sx={{ color: grey[50] }}>
          <SettingsIcon sx={{ width: '18px' }} />
        </IconButton>
        <IconButton sx={{ color: grey[50] }}>
          <LogoutIcon sx={{ width: '18px' }} />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default Navbar