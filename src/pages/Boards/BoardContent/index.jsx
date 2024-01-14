import { Box } from '@mui/material'

function index() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        height: (theme) => `calc(100vh - ${theme.trello.appBar} - ${theme.trello.boardBar})`,
        width: '100%'
      }}
    >
      Board Content
    </Box>
  )
}

export default index
