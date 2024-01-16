import ModeSelect from '../ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { Badge, Box, Button, InputAdornment, SvgIcon, TextField, Tooltip, Typography } from '@mui/material'
import trelloLogo from '~/assets/trello.svg?react'
import Workspaces from './Menus/Wordspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Profile from './Menus/Profile'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBar,
        display: 'flex',
        paddingX: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : 'hsl(215,90%,32.7%)')
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={trelloLogo} fontSize='small' sx={{ color: 'white' }} />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
        </Box>
        <Button
          variant='outlined'
          startIcon={<LibraryAddIcon />}
          sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }}
        >
          Create
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id='outlined-search'
          label='Search'
          type='text'
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <CloseIcon
                  onClick={() => setSearchValue('')}
                  sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                  fontSize='xs'
                />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: 120,
            maxWidth: 170,
            '& label': {
              color: 'white'
            },
            '& input': {
              color: 'white'
            },
            '& label.Mui-focused': {
              color: 'white'
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            }
          }}
        />
        <ModeSelect />
        <Tooltip title='Notification'>
          <Badge badgeContent={4} color='error'>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title='Help'>
          <HelpOutlineIcon sx={{ color: 'white' }} />
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
