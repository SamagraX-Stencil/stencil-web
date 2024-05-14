import React from 'react'
import sun from './assets/sun.png'
import book from './assets/book.png'
import chat from './assets/chat.png'
import pest from './assets/pest.png'
import cloud from './assets/cloud.png'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import { Link } from 'react-router-dom'

import { map } from 'lodash'
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Chip,
  Grid,
  Paper,
  Typography,
  styled,
} from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { useColorPalates } from '../theme-provider/hooks'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded'
import { useUiConfig } from '../../hook/useConfig'
import WeatherStatus from '../weather-status'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#363A44',
  borderRadius: '5px',
  position: 'relative',
}))

const Dashboard = () => {
  const config = useUiConfig('component', 'dashboard')
  console.log({ config })
  const theme = useColorPalates()
  const [value, setValue] = React.useState(0)
  const chips = [
    { id: 1, heading: 'हवा की दिशा', label: 'उत्तर पश्चिम' },
    { id: 2, heading: 'हवा की गति', label: 'धीमी', color: '#101860' },
    { id: 3, heading: 'नमी', label: 'ज़्यादा', color: '#4CC3CB' },
  ]

  const options = [
    {
      id: 1,
      label: config?.card1Title || 'मौसम की जानकारी',
      key: config?.card1Title,
      image: config?.card1Image || cloud,
    },
    {
      id: 2,
      label: config?.card2Title || 'योजनाओं की जानकारी',
      key: config?.card2Title,
      image: config?.card2Image || book,
    },
    {
      id: 3,
      label: config?.card3Title || 'कीट एवं रोग',
      key: config?.card3Title,
      image: config?.card3Image || pest,
    },
    {
      id: 3,
      label: config?.card4Title || 'अन्य सूचना',
      key: config?.card4Title,
      image: config?.card4Image || chat,
    },
  ]
  return (
    <div
      style={{
        height: 'auto',
        maxHeight: '80vh',
        overflowY: 'scroll',
      }}
    >
      <WeatherStatus />
      <div
        style={{
          background: `linear-gradient(90deg, #26C3E4 20%, #3A7BD5 100%)`,
          color: 'white',
          borderRadius: '5px',
        }}
        className="p-2"
      >
        <div className="mb-1 mt-4">
          <div className="text-right">
            <img src={sun} style={{ height: '30px', width: '30px' }} />
            <div
              style={{ display: 'flex', alignItems: 'flex-end' }}
              className="my-4 mr-2"
            >
              <div style={{ width: '30%' }}>
                <h1
                  style={{ color: 'white', fontSize: '48px', fontWeight: 600 }}
                >
                  27°C
                </h1>
              </div>
              <div
                className="text-right"
                style={{ width: '70%', fontSize: '40px', fontWeight: 600 }}
              >
                <h3>स्पष्ट</h3>
                <p>
                  <LocationOnRoundedIcon
                    style={{ fontSize: '18px', fontWeight: 400 }}
                  />{' '}
                  बिशनपुर सेक्टर 58, नोएडा
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ background: '#fff', height: '50%', borderRadius: '5px' }}
          className="p-2 text-center"
        >
          <div style={{ width: '80%' }} className="mx-auto px-8 py-2 ">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 3, sm: 8, md: 12 }}
            >
              {map(chips, (chip) => (
                <Grid item xs={1} sm={4} md={4}>
                  <div>
                    <Chip
                      label={chip?.label}
                      size="medium"
                      className=""
                      sx={{
                        fontSize: '16px',
                        fontWeight: '500',
                        minWidth: '70px',
                        background: chip?.color ?? null,
                        color: chip?.color ? 'white' : 'black',
                      }}
                    />

                    {/* <Chip
                      label={chip?.heading}
                      size="small"
                    
                      sx={{
                        minWidth: '70px',
                        background: 'white',
                        color: 'black',
                      }}
                    /> */}
                    <p
                      className="mt-3"
                      style={{
                        minWidth: '70px',
                        background: 'white',
                        color: 'black',
                      }}
                    >
                      {chip?.heading}
                    </p>
                  </div>
                </Grid>
              ))}
            </Grid>
            <Button
              fullWidth
              variant="contained"
              style={{
                marginTop: '20px',
                backgroundColor: '#EDEDF1',
                color: theme?.primary?.dark,
                fontSize: '18px',
                fontWeight: 600,
              }}
              className="py-2"
              endIcon={<ArrowForwardRoundedIcon />}
              component={Link}
              to="/weather-page"
            >
              जानिए मौसम के बारे में
            </Button>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div style={{ width: '95%' }} className="mx-auto">
          <p
            style={{
              color: 'black',
              background: theme.primary.light,
              borderRadius: '5px',
            }}
            className="py-1 px-2"
          >
            {config?.centerText}
          </p>

          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
            style={{ marginTop: '20px' }}
          >
            {options.map((_) => (
              <Grid item xs={1} sm={4} md={4}>
                <Item
                  style={{
                    border: '1px solid #B0B0B0',
                    borderRadius: '16px',
                  }}
                >
                  <img
                    src={_?.image}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                  />
                  <p
                    style={{
                      fontSize: '20px',
                      color: 'black',
                    }}
                    className="mt-2"
                  >
                    {_?.label}
                  </p>
                </Item>
              </Grid>
            ))}
          </Grid>
          <div className="mt-4 text-center">
            <p
              style={{
                color: '##6C758B',
                fontSize: '14px',
                textAlign: 'start',
              }}
            >
              {config?.bottomText}
            </p>
          </div>
        </div>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              console.log(event)
              setValue(newValue)
            }}
          >
            <BottomNavigationAction label="होम " icon={<HomeRoundedIcon />} />
            <Button
              className="my-auto"
              sx={{
                height: '30px',
                borderRadius: '40px',
                background: theme.primary.dark,
                color: 'white',
              }}
              size="small"
              variant="contained"
              startIcon={<KeyboardVoiceRoundedIcon />}
            >
              बोल के पूछे
            </Button>

            <BottomNavigationAction
              label="अलर्टस"
              icon={
                <Badge badgeContent="3" color="error">
                  <Typography fontSize="xl">🔔</Typography>
                </Badge>
              }
            />
          </BottomNavigation>
        </Paper>
      </div>
    </div>
  )
}

export default Dashboard
