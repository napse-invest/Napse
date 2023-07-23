// React
import React, { FC, useState } from 'react'

// Mui
import { Button, Menu, MenuItem } from '@mui/material'

interface Props {
  suppliers: {
    id: string
    name: string
  }[]
  selectedSupplier: string
  setSelectedSupplier: (value: string) => void
}

const SupplierSelector: FC<Props> = (props) => {
  const { suppliers, selectedSupplier, setSelectedSupplier } = props

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const changeSupplier = (supplier: { id: string; name: string }): void => {
    setSelectedSupplier(supplier.name)
    localStorage.setItem('selected-supplier', supplier.name)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {selectedSupplier || 'Select Supplier'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(): void => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {suppliers.map((supplier, index) => (
          <MenuItem key={index} onClick={(): void => changeSupplier(supplier)}>
            {supplier.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default SupplierSelector
