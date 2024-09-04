export async function recordUserLocation() {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          localStorage.setItem('latitude', String(position.coords.latitude));
          localStorage.setItem('longitude', String(position.coords.longitude));
          let locationRes: any = await fetch(
            `https://geoip.samagra.io/georev?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
          );
          locationRes = await locationRes.json();
          if (locationRes?.subDistrict) localStorage.setItem('block', locationRes.subDistrict);
          if (locationRes?.district) localStorage.setItem('city', locationRes.district);
          if (locationRes?.state) localStorage.setItem('state', locationRes.state);
          let apiRes: any = await fetch('https://ip-retriever-production.up.railway.app/');

          apiRes = await apiRes.text();

          if (apiRes) {
            let locationRes: any = await fetch(`https://geoip.samagra.io/city/${apiRes}`);
            locationRes = await locationRes.json();
            localStorage.setItem('ip', apiRes);
          }
        },
        async (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            let apiRes: any = await fetch('https://ip-retriever-production.up.railway.app/');

            apiRes = await apiRes.text();

            if (apiRes) {
              let locationRes: any = await fetch(`https://geoip.samagra.io/city/${apiRes}`);
              locationRes = await locationRes.json();
              localStorage.setItem('ip', apiRes);
              if (!localStorage.getItem('city')) localStorage.setItem('city', locationRes.city);
              if (!localStorage.getItem('state'))
                localStorage.setItem('state', locationRes.regionName);
              localStorage.setItem('latitude', locationRes.lat);
              localStorage.setItem('longitude', locationRes.lon);
            }
          } else {
            let apiRes: any = await fetch('https://ip-retriever-production.up.railway.app/');

            apiRes = await apiRes.text();

            if (apiRes) {
              let locationRes: any = await fetch(`https://geoip.samagra.io/city/${apiRes}`);
              locationRes = await locationRes.json();
              localStorage.setItem('ip', apiRes);
              if (!localStorage.getItem('city')) localStorage.setItem('city', locationRes.city);
              if (!localStorage.getItem('state'))
                localStorage.setItem('state', locationRes.regionName);
              localStorage.setItem('latitude', locationRes.lat);
              localStorage.setItem('longitude', locationRes.lon);
            }
            console.error('Error occurred while getting location:', error);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
}
