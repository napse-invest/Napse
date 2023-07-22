// React
import { FC, useState } from 'react'

// Mui
import { InputAdornment } from '@mui/material'

// Components
import Input from './Input'

// Icons
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

interface Props {
  helperText?: string
  error?: boolean
}

const Password: FC<Props> = (props) => {
  const { error, helperText, ...otherProps } = props

  const [show, setShow] = useState(false)

  return (
    <Input
      helperText={error ? helperText : ''}
      type={show ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {show ? (
              <VisibilityIcon
                onClick={(): void => setShow(false)}
                sx={{
                  cursor: 'pointer'
                }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={(): void => setShow(true)}
                sx={{
                  cursor: 'pointer'
                }}
              />
            )}
          </InputAdornment>
        )
      }}
      error={error}
      {...otherProps}
    />
  )
}

export default Password
