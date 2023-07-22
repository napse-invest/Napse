// React
import { FC } from 'react'

// Mui
import { styled } from '@mui/material'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  '& input': {
    '&:-webkit-autofill': {
      boxShadow: 'unset',
      webkitTextFillColor: theme.palette.text.primary,
      WebkitBoxShadow: '0 0 0px 1000px' + theme.palette.background.default + ' inset'
    }
  }
}))

type Props = TextFieldProps & {
  helperText?: string
  error?: boolean
}

const Input: FC<Props> = (props) => {
  const { helperText, error, ...otherProps } = props

  return <StyledTextField helperText={!error ? null : helperText} error={error} {...otherProps} />
}

export default Input
