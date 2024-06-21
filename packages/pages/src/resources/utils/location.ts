import { toast } from 'react-hot-toast';

export async function recordUserLocation() {
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveUserLocation);
        }

        let apiRes: any = await fetch('https://api.ipify.org?format=json');

        apiRes = await apiRes.json();

        if (apiRes?.ip) {
            navigator.permissions.query({ name: 'geolocation' }).then(async (res: any) => {

                let locationRes: any = await fetch(`https://geoip.samagra.io/city/${apiRes.ip}`);
                locationRes = await locationRes.json();
                sessionStorage.setItem('city', locationRes.city);
                sessionStorage.setItem('state', locationRes.regionName);
                sessionStorage.setItem('ip', apiRes?.ip);

                if (res.state != 'granted') {
                    sessionStorage.setItem('latitude', locationRes.lat);
                    sessionStorage.setItem('longitude', locationRes.lon);
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}

function saveUserLocation(position: any) {
    sessionStorage.setItem('latitude', position.coords.latitude);
    sessionStorage.setItem('longitude', position.coords.longitude);
}

