import { Box } from '@mui/material'

function index() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBar,
        backgroundColor: 'primary.dark',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board Bot
    </Box>
  )
}

export default index
