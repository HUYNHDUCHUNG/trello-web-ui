import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
const CHIP_STYLE = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '5px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  }
}
function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBar,
        display: 'flex',
        paddingX: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : 'hsla(215,90%,37.7%,0.9)'),
        borderBottom: '1px solid #7f8c8d'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip sx={CHIP_STYLE} avatar={<DashboardIcon />} label='Dash board' clickable />
        <Chip sx={CHIP_STYLE} avatar={<VpnLockIcon />} label='Private/Public WordPress' clickable />
        <Chip sx={CHIP_STYLE} avatar={<AddToDriveIcon />} label='Add To GoogleDriver' clickable />
        <Chip sx={CHIP_STYLE} avatar={<BoltIcon />} label='Automation' clickable />
        <Chip sx={CHIP_STYLE} avatar={<FilterListIcon />} label='Filter' clickable />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color: 'white',
            borderColor: 'white',
            borderWidth: '0.5px !important',
            '&:hover': {
              border: '1px solid white'
            }
          }}
          variant='outlined'
          startIcon={<GroupAddIcon />}
        >
          Invite
        </Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16
            }
          }}
        >
          <Tooltip title='hunghd'>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </Tooltip>
          <Tooltip title='hunghd'>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </Tooltip>
          <Tooltip title='hunghd'>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </Tooltip>
          <Tooltip title='hunghd'>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </Tooltip>
          <Tooltip title='hunghd'>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
