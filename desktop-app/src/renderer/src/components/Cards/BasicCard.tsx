// Mui
import { Box, Typography, Stack } from '@mui/material'

interface Props {
  title?: JSX.Element
  body: JSX.Element
}

const BasicCard = (props: Props): JSX.Element => {
  const { title, body, ...otherProps } = props
  return (
    <Box
      padding={2}
      boxSizing="border-box"
      borderRadius="5px"
      overflow="hidden"
      boxShadow="0 0 5px rgba(0, 0, 0, 0.2)"
      display="flex"
      {...otherProps}
    >
      <Stack spacing={2} sx={{ width: '100%' }}>
        {props.title && <Typography variant="h5">{title}</Typography>}

        <Box sx={{ flex: '1' }}>{body}</Box>
      </Stack>
    </Box>
  )
}

export default BasicCard
