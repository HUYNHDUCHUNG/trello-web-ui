import { Box, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Cloud, ContentCopy, ContentCut, ContentPaste } from '@mui/icons-material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import React from 'react'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sort'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
function Column({ column }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? '0.5' : undefined
  }

  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#dfe6e9'),
          // bgcolor: '#dfe6e9',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* Box Column Header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More Options'>
              <ExpandMoreIcon
                id='basic-button-column-dropdown'
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: 'primary.main', cursor: 'pointer' }}
              />
            </Tooltip>

            <Menu
              id='basic-menu-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize='small' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize='small' />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Box Column List Card*/}
        <ListCards cards={orderedCards} />

        {/* Box Column Footer*/}
        <Box
          sx={{
            height: (theme) => theme.trello.columFooterHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button startIcon={<AddCardIcon />}>Add new card</Button>
          <Tooltip>
            <DragHandleIcon />
          </Tooltip>
        </Box>
      </Box>
    </div>
  )
}

export default Column
