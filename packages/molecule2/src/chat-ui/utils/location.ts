export async function recordUserLocation() {
    let lat = 0, long = 0;

    async function saveUserLocation(position: any) {
        // Capturing user location through GPS
        sessionStorage.setItem('latitude', position.coords.latitude);
        sessionStorage.setItem('longitude', position.coords.longitude);
        lat = position.coords.latitude;
        long = position.coords.longitude;
    }

    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveUserLocation);
        }

        // Fetching user's ip
        let apiRes: any = await fetch('https://api.ipify.org?format=json');

        apiRes = await apiRes.json();

        navigator.permissions.query({ name: 'geolocation' }).then(async (res: any) => {
            // If user doesn't grant gps permission
            if (res.state != 'granted') {
                if (apiRes?.ip) {
                    let locationRes: any = await fetch(`https://geoip.samagra.io/city/${apiRes.ip}`);
                    locationRes = await locationRes.json();
                    let latLongRes: any = await fetch(`https://geoip.samagra.io/georev?lat=${locationRes?.lat}&lon=${locationRes?.lon}`);
                    latLongRes = await latLongRes.json();
                    sessionStorage.setItem('city', latLongRes?.district);
                    sessionStorage.setItem('state', latLongRes?.state);
                    sessionStorage.setItem('subDistrict', latLongRes?.subDistrict)
                    sessionStorage.setItem('village', latLongRes?.village || '')
                    sessionStorage.setItem('ip', apiRes?.ip);
                    sessionStorage.setItem('latitude', locationRes.lat);
                    sessionStorage.setItem('longitude', locationRes.lon);
                    sessionStorage.setItem('captureMode', 'ip');
                }
            } else {
                // If user has provided geolocation access then
                let locationRes: any = await fetch(`https://geoip.samagra.io/georev?lat=${lat || sessionStorage.getItem('latitude')}&lon=${long || sessionStorage.getItem('longitude')}`);
                locationRes = await locationRes.json();
                sessionStorage.setItem('city', locationRes?.district);
                sessionStorage.setItem('state', locationRes?.state);
                sessionStorage.setItem('subDistrict', locationRes?.subDistrict)
                sessionStorage.setItem('village', locationRes?.village || '')
                sessionStorage.setItem('ip', apiRes?.ip);
                sessionStorage.setItem('captureMode', 'gps');
            }

        })
    } catch (err) {
        console.log(err)
    }
}

