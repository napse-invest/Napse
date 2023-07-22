// Mui
import { TextField, styled } from '@mui/material'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& input': {
    '&:-webkit-autofill': {
      boxShadow: 'unset',
      webkitTextFillColor: theme.palette.text.primary,
      WebkitBoxShadow: '0 0 0px 1000px' + theme.palette.background.default + ' inset'
    }
  }
}))

interface Props {
  helperText?: string
  error?: boolean
}

const Input = (props: Props): JSX.Element => {
  const { helperText, error, ...otherProps } = props

  return <StyledTextField helperText={!error ? null : helperText} error={error} {...otherProps} />
}

export default Input
