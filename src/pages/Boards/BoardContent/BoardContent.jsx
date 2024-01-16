import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

function BoardContent({ board }) {
  const orderedColums = mapOrder(board?.columns, board?.columnOrderIds, '_id')

  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#2a9dcc'),
        height: (theme) => theme.trello.boardContentHeight,
        width: '100%',
        p: '10px 0'
      }}
    >
      <ListColumns columns={orderedColums} />
    </Box>
  )
}

export default BoardContent
