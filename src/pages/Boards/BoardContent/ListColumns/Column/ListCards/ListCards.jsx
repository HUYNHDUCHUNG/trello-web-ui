import { Box } from '@mui/material'
import Card from './Card/Card'
function ListCards({ cards }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: '0 5px',
        m: '0 5px',
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} -
                ${theme.spacing(5)} -
                ${theme.trello.columnHeaderHeight} -
                ${theme.trello.columFooterHeight})`,
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#b2bec3',
          borderRadius: '8px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#7f8c8d'
        }
      }}
    >
      {cards?.map((card) => (
        <Card key={card._id} card={card} />
      ))}
    </Box>
  )
}

export default ListCards
