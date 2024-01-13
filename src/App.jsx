import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import { useColorScheme } from '@mui/material/styles'
import { Container, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import DarkModeOutlineIcon from '@mui/icons-material/DarkModeOutlined'
import Box from '@mui/material/Box'
function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selectMode = event.target.value
    setMode(selectMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
      <InputLabel id='label-select-dark-light-mode'>Mode</InputLabel>
      <Select
        labelId='label-select-dark-light-mode'
        id='demo-select-small'
        value={mode}
        label='Mode'
        onChange={handleChange}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon />
            Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlineIcon />
            Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box
        sx={{
          width: '100%',
          height: (theme) => theme.trello.appBar,
          backgroundColor: 'primary.light',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ModeSelect />
      </Box>
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
      <Box
        sx={{
          backgroundColor: 'primary.main',
          height: (theme) => `calc(100vh - ${theme.trello.appBar} - ${theme.trello.boardBar})`,
          width: '100%'
        }}
      >
        Board Content
      </Box>
    </Container>
  )
}

export default App
