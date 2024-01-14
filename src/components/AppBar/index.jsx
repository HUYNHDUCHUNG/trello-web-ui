import ModeSelect from '../ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { Badge, Box, Button, SvgIcon, TextField, Tooltip, Typography } from '@mui/material'
import trelloLogo from '~/assets/trello.svg?react'
import Workspaces from './Menus/Wordspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profile from './Menus/Profile'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
function index() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBar,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={trelloLogo} inheritViewBoxs sx={{ color: 'primary.main' }} />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>
            Trello
          </Typography>
        </Box>
        <Workspaces />
        <Recent />
        <Starred />
        <Templates />
        <Button variant='outlined'>Create</Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id='outlined-search' label='Search' type='search' size='small' />
        <ModeSelect />
        <Tooltip title='Notification'>
          <Badge badgeContent={4} color='secondary'>
            <NotificationsNoneIcon color='action' />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <HelpOutlineIcon color='action' />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default index
