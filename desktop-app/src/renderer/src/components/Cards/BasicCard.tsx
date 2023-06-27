// Mui
import { Box, Typography, Stack } from '@mui/material'

interface Props {
  title?: string
  body: JSX.Element
}

const BasicCard = (props: Props): JSX.Element => {
  const { title, body, ...otherProps } = props
  return (
    <Box
      padding={1}
      boxSizing="border-box"
      borderRadius="15px"
      overflow="hidden"
      boxShadow="0 0 5px rgba(0, 0, 0, 0.1)"
      display="flex"
      {...otherProps}
    >
      <Stack spacing={1} sx={{ width: '100%' }}>
        {props.title && <Typography variant="h5">{title}</Typography>}

        <Box sx={{ flex: '1' }}>{body}</Box>
      </Stack>
    </Box>
  )
}

export default BasicCard
