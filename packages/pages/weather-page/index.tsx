import React, { useState } from 'react'
import sun from './assets/sun.png'
import wheatImage from './assets/crop1.png'
import rainingCloud from './assets/rainingCloud.png'
import heaveRain from './assets/heavyRain.png'
import sunRainCloud from './assets/sunRainCloud.png'
import thunderCloud from './assets/thunderCloud.png'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
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
import { useColorPalates } from '@repo/hooks'

import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded'
import CropInfoModel from './crop-info-model'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#363A44',
  borderRadius: '5px',
  position: 'relative',
}))

const WheatherPage = () => {
  const [isModelOpen, setIsModelOpen] = useState(false)
  const handleOpenModal = () => {
    setIsModelOpen(true)
  }

  const config = {
    allowOverride: false,
    weatherCardText: 'जानिए मौसम के बारे में',
    centerText: 'मुझसे कुछ भी पूछें',
    card1Title: 'मौसम की जानकारी',
    card1Image: null,
    card2Title: 'योजनाओं की जानकारी',
    card2Image: null,
    card3Title: 'कीट एवं रोग',
    card3Image: null,
    card4Title: 'अन्य सूचना',
    card4Image: null,
    bottomText:
      'आमा कृषी चैटबॉट गलतियाँ कर सकता है। महत्वपूर्ण जानकारी की जाँच करने पर विचार करें. हमारी शर्तें और गोपनीयता नीति पढ़ें।',
  }
  console.log({ config })
  const theme = useColorPalates()
  const [value, setValue] = React.useState(0)
  const chips = [
    { id: 1, heading: 'हवा की दिशा', label: 'उत्तर पश्चिम' },
    { id: 2, heading: 'हवा की गति', label: 'धीमी', color: '#101860' },
    { id: 3, heading: 'नमी', label: 'ज़्यादा', color: '#4CC3CB' },
  ]
  const upComingWhetherData = [
    { id: 1, day: 'Sun', temp: '21°C', img: heaveRain },
    { id: 2, day: 'Mon', temp: '21°C', img: thunderCloud },
    { id: 3, day: 'Tue', temp: '21°C', img: sunRainCloud },
    { id: 4, day: 'Thur', temp: '21°C', img: rainingCloud },
  ]

  return (
    <div
      style={{
        height: 'auto',
        maxHeight: '90vh',
        overflowY: 'scroll',
      }}
    >
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
              {' '}
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
          <div style={{ width: '80%', marginTop: '12px' }} className="mx-auto ">
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 3, sm: 8, md: 12 }}
            >
              {map(chips, (chip) => (
                <Grid item xs={1} sm={4} md={4}>
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
                  />{' '}
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
                </Grid>
              ))}
            </Grid>

            <div style={{ marginTop: '30px' }}>
              {/* <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <img src={bulb} alt="hint icon" height={'25px'} />
                <p
                  style={{
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: 600,
                  }}
                >
                  प्रो युक्तियाँ:
                </p>
              </div>
              <div
                style={{
                  margin: '16px 0px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'flex-start',
                  textAlign: 'start',
                }}
              >
                {[
                  'इस सप्ताह कोई बारिश का अनुमान नहीं है।',
                  'इस सप्ताह कोई बारिश का अनुमान नहीं है।',
                  'गुरुवार का दिन निराई-गुड़ाई के लिए अच्छा रहेगा ।',
                ].map((item, index) => (
                  // <div key={index}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        marginRight: '8px',
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: 400,
                      }}
                    >{`${index}.`}</span>
                    <Typography
                      color="black"
                      style={{
                        wordBreak: 'break-word',
                        fontSize: '16px',
                        fontWeight: 400,
                      }}
                    >
                      {item}
                    </Typography>
                  </div>

                  // </div>
                ))}
              </div> */}
              <div
                style={{
                  color: 'black',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <p style={{ width: '20%', fontSize: '16px', fontWeight: 400 }}>
                  अगले 4 दिनों का पूर्वानुमान
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flex: '1',
                  }}
                >
                  {upComingWhetherData.map((ele, index) => (
                    <div
                      key={ele.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flex: '1',
                      }}
                    >
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 400 }}>
                          {ele.day}
                        </p>
                        <img
                          src={ele.img}
                          alt=""
                          style={{ margin: '8px 0' }}
                          height={'32px'}
                        />
                        <p style={{ fontSize: '16px', fontWeight: 400 }}>
                          {ele.temp}
                        </p>
                      </div>
                      {index !== 3 && (
                        <div
                          style={{
                            width: '1px',
                            height: '80%',
                            backgroundColor: '#ccc',
                            margin: '0 5px',
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div style={{ width: '95%' }} className="mx-auto">
          <p
            style={{
              color: '#51586B',
              background: theme.primary.light,
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 600,
            }}
            className="p-2"
          >
            आज की फ़सल सलाह
          </p>
          {isModelOpen && (
            <CropInfoModel
              isOpen={isModelOpen}
              onClose={() => setIsModelOpen(false)}
            />
          )}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 8, md: 12 }}
            style={{ marginTop: '20px' }}
          >
            {[1, 2, 3, 4, 5, 6].map(() => (
              <Grid item xs={1} sm={4} md={4}>
                <Item
                  style={{
                    border: '1px solid #B0B0B0',
                  }}
                  onClick={handleOpenModal}
                >
                  <img
                    src={wheatImage}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                    }}
                  />
                  <p style={{ lineHeight: '1rem' }} className="mt-2">
                    गेहूँ
                  </p>
                </Item>
              </Grid>
            ))}
          </Grid>
          {/* <div className="mt-4 text-center">
            <p style={{ color: '##6C758B', fontSize: '12px' }}>
              {config?.bottomText}
            </p>
          </div> */}
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

export default WheatherPage
