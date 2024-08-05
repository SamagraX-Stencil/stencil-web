import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { Chip, Grid } from '@mui/material';
import { useConfig } from '../../hooks/useConfig';
import { useLocalization } from '../../hooks';
import axios from 'axios';
import { FullPageLoader } from '@samagra-x/stencil-molecules/lib/fullpage-loader';
import WeatherAdvisoryPopup from '../../components/weather-advisory-popup';
import saveTelemetryEvent from '../../utils/telemetry';
import { v4 as uuidv4 } from 'uuid';
import Menu from '../../components/menu';

const WeatherPage: React.FC = () => {
  const t = useLocalization();
  const config = useConfig('component', 'weatherPage');
  const [weather, setWeather] = useState<any>(null);
  const [crop, setCrop] = useState<any>(null);
  const [isNight, setIsNight] = useState(false);
  const [showWeatherAdvisoryPopup, setShowWeatherAdvisoryPopup] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  const [fetchTime, setFetchTime] = useState(0);
  const [convId, setConvId] = useState(uuidv4());
  const [telemetrySent, setTelemetrySent] = useState(false);
  console.log({ config });

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
      setIsNight(true);
    }
  }, []);

  const fetchWeatherData = async () => {
    const startTime = performance.now();
    if (!localStorage.getItem('longitude') || !localStorage.getItem('latitude')) return;
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_WEATHER_API || '', {
        params: {
          latitude: localStorage.getItem('latitude'),
          longitude: localStorage.getItem('longitude'),
          provider: config?.provider || 'upcar',
        },
      });

      const endTime = performance.now();
      setFetchTime(endTime - startTime);
      console.log(response.data);
      const providers = response.data.message.catalog.providers;
      // setData(providers);

      // providers.forEach((provider: any) => {
      //   if(provider?.id === 'upcar') {
      //     setCrop(provider);
      //   }else{
      //     setWeather(provider);
      //   }
      // });

      providers.forEach((provider: any) => {
        if (provider.id.toLowerCase() === 'ouat') {
          if (provider.category_id === 'crop_advisory_provider') {
            setCrop(provider?.items);
          } else if (provider.category_id === 'weather_provider') {
            setWeather((prev: any) => ({
              ...prev,
              future: provider?.items,
            }));
          }
        } else {
          if (provider.category_id === 'weather_provider' && provider.id === 'imd') {
            if (!weather) {
              setWeather((prev: any) => ({
                future: provider?.items?.slice(1),
                current: provider?.items?.[0],
              }));
            } else {
              setWeather((prev: any) => ({
                ...prev,
                current: provider?.items?.[0],
              }));
            }
          } else if (provider.category_id === 'crop_advisory_provider' && provider.id === 'upcar') {
            if (!crop) {
              setCrop(provider?.items);
            }
          }
        }
      });
      return providers;
    } catch (error) {
      console.error('Error fetching advisory data:', error);
      throw error;
    }
  };

  // Keep fetching weather data until it's available
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!weather) {
      interval = setInterval(() => {
        fetchWeatherData();
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [weather, fetchWeatherData]);

  const sendTelemetry = async (messageId?: string, cropData?: any) => {
    try {
      if (weather?.current) {
        setTelemetrySent(true);
        const msgId = uuidv4();
        await saveTelemetryEvent('0.1', 'E032', 'messageQuery', 'messageSent', {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          conversationId: convId,
          messageId: msgId || messageId || '',
          text: cropData?.descriptor?.name || t('label.weather'),
          createdAt: Math.floor(new Date().getTime() / 1000),
        });
        await saveTelemetryEvent('0.1', 'E005', 'userQuery', 'userHistory', {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          conversationId: convId,
          messageId: msgId || messageId || '',
          text: cropData?.descriptor?.name || t('label.weather'),
          createdAt: Math.floor(new Date().getTime() / 1000),
          timeTaken: 0,
          did: uuidv4(),
        });
        await saveTelemetryEvent('0.1', 'E006', 'userQuery', 'userInfo', {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          conversationId: convId,
          messageId: msgId || messageId || '',
          text: cropData?.descriptor?.name || t('label.weather'),
          createdAt: Math.floor(new Date().getTime() / 1000),
          block: localStorage.getItem('block') || '',
          district: localStorage.getItem('city') || '',
          transformerId: uuidv4(),
        });
        saveTelemetryEvent('0.1', 'E017', 'userQuery', 'responseAt', {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          conversationId: convId || '',
          messageId: msgId || messageId || '',
          text: '',
          timeTaken: 0,
          createdAt: Math.floor(new Date().getTime() / 1000),
        });
        saveTelemetryEvent('0.1', 'E012', 'userQuery', 'llmResponse', {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          transformerId: uuidv4(),
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          conversationId: convId || '',
          replyId: uuidv4(),
          messageId: msgId || messageId || '',
          text: cropData?.descriptor?.long_desc || JSON.stringify(weather.current),
          createdAt: Math.floor(new Date().getTime() / 1000),
          timeTaken: parseInt(`${fetchTime}`),
          responseType: `Guided: weather`,
          isGuided: 'true',
          isFlowEnd: 'false',
        });
        saveTelemetryEvent('0.1', 'E033', 'messageQuery', 'messageReceived', {
          botId: process.env.NEXT_PUBLIC_BOT_ID || '',
          orgId: process.env.NEXT_PUBLIC_ORG_ID || '',
          userId: localStorage.getItem('userID') || '',
          phoneNumber: localStorage.getItem('phoneNumber') || '',
          conversationId: convId || '',
          replyId: uuidv4(),
          messageId: msgId || messageId || '',
          text: cropData?.descriptor?.long_desc || JSON.stringify(weather.current),
          createdAt: Math.floor(new Date().getTime() / 1000),
          timeTaken: parseInt(`${fetchTime}`),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!telemetrySent) {
      sendTelemetry();
    }
  }, [weather]);

  function getDayAbbreviation(index: number): string {
    const date = new Date();
    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayIndex: number = date.getDay();
    const futureDayIndex: number = (currentDayIndex + index + 1) % 7;
    return days[futureDayIndex];
  }

  if (!weather || !crop) {
    return <FullPageLoader loading={!weather || !crop} />;
  }
  return (
    <div className={styles.main}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      ></meta>
      {showWeatherAdvisoryPopup && (
        <WeatherAdvisoryPopup
          cropName={selectedCrop?.code}
          setShowWeatherAdvisoryPopup={setShowWeatherAdvisoryPopup}
          advisory={selectedCrop}
        />
      )}
      <div
        data-testid="weather-page-bg-image"
        className={styles.container}
        style={{
          background: `url(${weather?.current?.descriptor?.images
            ?.find((image: any) => image.type === (isNight ? 'image_night' : 'image_day'))
            ?.url?.replace(/ /g, '%20')
            ?.replace(/\(/g, '%28')
            ?.replace(/\)/g, '%29')})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className={styles.weatherText}>
          <div>
            <h1
              data-testid="weather-page-temperature"
              style={{
                color: 'white',
                margin: 0,
                fontSize: '2.75rem',
              }}
            >
              {weather?.current?.tags?.temp}°C
            </h1>
          </div>

          <div
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            {localStorage.getItem('city') && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'end',
                }}
              >
                <LocationOnRoundedIcon style={{ fontSize: '1.5rem' }} />
                <span style={{ fontSize: '1.5rem' }} data-testid="weather-page-location">
                  {localStorage.getItem('city')}
                </span>
              </div>
            )}
            <h2
              data-testid="weather-page-condition"
              style={{
                color: 'white',
                margin: 0,
                fontSize: '1.75rem',
                wordBreak: 'break-word',
              }}
            >
              {localStorage.getItem('locale') === 'en'
                ? weather?.current?.tags?.conditions
                : weather?.current?.tags?.[
                    `conditions${'_' + localStorage.getItem('locale') || ''}`
                  ]}
            </h2>
          </div>
        </div>

        <div className={styles.weatherBottom}>
          <Grid
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '5px 10px',
              borderBottom: '1px solid #cdcaca',
            }}
            spacing={{ xs: 2, md: 3 }}
            columns={3}
          >
            <Grid item xs={1} sm={1} md={1} data-testid="weather-page-wind-direction">
              <Chip
                label={
                  localStorage.getItem('locale') === 'en'
                    ? weather?.current?.tags?.winddir
                    : weather?.current?.tags?.[
                        `winddir${'_' + localStorage.getItem('locale') || ''}`
                      ]
                }
                size="medium"
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  minWidth: '70px',
                  background: null,
                }}
              />
              <p
                style={{
                  minWidth: '70px',
                  background: 'white',
                  color: 'black',
                  fontWeight: '600',
                  marginTop: '5px',
                }}
              >
                {t('label.wind_direction')}
              </p>
            </Grid>
            <Grid item xs={1} sm={1} md={1} data-testid="weather-page-wind-speed">
              <Chip
                label={(weather?.current?.tags?.windspeed || 0) + ' km/h'}
                size="medium"
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  minWidth: '70px',
                  background: '#101860',
                  color: 'white',
                }}
              />
              <p
                style={{
                  minWidth: '70px',
                  background: 'white',
                  color: 'black',
                  fontWeight: '600',
                  marginTop: '5px',
                }}
              >
                {t('label.wind_speed')}
              </p>
            </Grid>
            <Grid item xs={1} sm={1} md={1} data-testid="weather-page-humidity">
              <Chip
                label={(weather?.current?.tags?.humidity || 0) + ' %'}
                size="medium"
                sx={{
                  fontSize: '14px',
                  fontWeight: '600',
                  minWidth: '70px',
                  background: '#4CC3CB',
                  color: 'white',
                }}
              />
              <p
                style={{
                  minWidth: '70px',
                  background: 'white',
                  color: 'black',
                  fontWeight: '600',
                  marginTop: '5px',
                }}
              >
                {t('label.humidity')}
              </p>
            </Grid>
          </Grid>

          <div style={{ marginTop: '10px' }}>
            <div
              data-testid="weather-page-forecast"
              style={{
                color: 'black',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0px',
              }}
            >
              <div
                style={{
                  flex: 0.4,
                  maxWidth: '110px',
                  height: '112px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <p
                  style={{
                    textAlign: 'left',
                    color: '#cdcaca',
                    marginLeft: '10px',
                  }}
                >
                  {t('label.weather_forecast')}
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <p
                    style={{
                      textAlign: 'left',
                      color: '#cdcaca',
                      marginBottom: 0,
                    }}
                  >
                    {t('label.high')}
                  </p>
                  <div
                    style={{
                      backgroundColor: '#cdcaca',
                      height: '1px',
                      width: '45px',
                    }}
                  ></div>
                  <p
                    style={{
                      textAlign: 'left',
                      color: '#cdcaca',
                      marginBottom: 0,
                    }}
                  >
                    {t('label.low')}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  flex: '1',
                }}
              >
                {weather?.future?.map((ele: any, index: any) => {
                  if (index > 3) return;
                  return (
                    <>
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flex: '1',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <p>{getDayAbbreviation(index)}</p>
                          <img
                            src={
                              ele?.descriptor?.images?.find((image: any) => image.type === 'icon')
                                ?.url
                            }
                            alt=""
                            height="32px"
                            width="32px"
                          />
                          <p
                            style={{
                              fontWeight: 400,
                              margin: '0',
                            }}
                          >
                            {Number(ele?.tags?.temp_max)}°
                          </p>
                          <div
                            style={{
                              width: '80%',
                              height: '1px',
                              margin: 'auto',
                              backgroundColor: '#cdcaca',
                            }}
                          ></div>
                          <p
                            style={{
                              fontWeight: 400,
                              margin: '0',
                              opacity: '0.5',
                            }}
                          >
                            {Number(ele?.tags?.temp_min)}°
                          </p>
                        </div>
                      </div>
                      {index < 3 && (
                        <div
                          style={{
                            flex: '0.01 1',
                            backgroundColor: '#cdcaca',
                          }}
                        ></div>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cropContainer}>
        <div
          className={styles.heading}
          style={{ background: '#DFF6D1' }}
          data-testid="weather-page-advisory-text"
        >
          {t('label.todays_advisory')}
        </div>
        <Grid
          data-testid="weather-page-crop-list"
          container
          columns={3}
          overflow={'auto'}
          height={'calc(100% - 50px)'}
          justifyContent={'center'}
        >
          {(localStorage.getItem('locale') !== 'en'
            ? crop.filter((ele: any) =>
                ele.category_ids.some((categoryId: string) => categoryId.endsWith('translated'))
              )
            : crop.filter(
                (ele: any) =>
                  !ele.category_ids.some((categoryId: string) => categoryId.endsWith('translated'))
              )
          ).map((ele: any, index: number) => {
            return (
              <Grid
                item
                key={index}
                sx={{
                  textAlign: 'center',
                  padding: '5px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  borderRadius: '5px',
                  margin: '10px',
                  width: '26%',
                }}
                onClick={() => {
                  setShowWeatherAdvisoryPopup(true);
                  setSelectedCrop(ele);
                  sendTelemetry(uuidv4(), ele);
                }}
              >
                <img src={ele?.descriptor?.images?.[0]?.url} alt="" width={80} height={80} />
                <p>{ele?.descriptor?.name}</p>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Menu />
    </div>
  );
};

export default WeatherPage;
