// React
import * as React from 'react'
import { useEffect, useState } from 'react'

// Mui
import { Button, Menu, MenuItem, Stack, Typography } from '@mui/material'

const Space = (): JSX.Element => {
  const [spaceName, setSpaceName] = useState<string>(
    localStorage.getItem('current-space') || 'space-1'
  )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const changeSpace = (space: string): void => {
    setAnchorEl(null)
    setSpaceName(space)
    window.dispatchEvent(new Event('space-changed'))
  }

  useEffect(() => {
    localStorage.setItem('current-space', spaceName)
  }, [spaceName])

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Space</Typography>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {spaceName}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={(): void => {
            setAnchorEl(null)
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem
            onClick={(): void => {
              changeSpace('space-1')
            }}
          >
            space-1
          </MenuItem>
          <MenuItem
            onClick={(): void => {
              changeSpace('space-2')
            }}
          >
            space-2
          </MenuItem>
        </Menu>
      </div>
    </Stack>
  )
}

export default Space
