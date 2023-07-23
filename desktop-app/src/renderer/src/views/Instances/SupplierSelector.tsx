// React
import React, { FC, useState } from 'react'

// Router
import { useNavigate } from 'react-router-dom'

// Mui
import { Button, Menu, MenuItem } from '@mui/material'

type Supplier = {
  id: string
  name: string
}

interface Props {
  suppliers: Supplier[]
  selectedSupplier: string
  setSelectedSupplier: (value: string) => void
}

const SupplierSelector: FC<Props> = (props) => {
  const { suppliers, selectedSupplier, setSelectedSupplier } = props

  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const changeSupplier = (supplier: Supplier): void => {
    setAnchorEl(null)
    setSelectedSupplier(supplier.name)
  }
  const newSupplier = (): void => {
    setAnchorEl(null)
    setSelectedSupplier('')
    navigate('/suppliers/new')
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
        <MenuItem onClick={newSupplier}>New Supplier</MenuItem>
      </Menu>
    </div>
  )
}

export default SupplierSelector
