//https://cors-anywhere.herokuapp.com/'
//https://darksky.net/forecast/40.7127,-74.0059/us12/en
//https://darkskyapp.github.io/skycons/
//https://github.com/darkskyapp/skycons

/*
        "location">
            "location-timezone">Timezone</h1>**
            --
        "temperature">
            "temperature-degree-section">
                "temperature-degree">34</h2>**
                    <span>F</span>**
                
                "temperature-description">It is frigging cold</div>**
*/

window.addEventListener('load', ()=>{
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureDegreeSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // //const params = 'windSpeed';
            // const proxy = "https://cors-anywhere.herokuapp.com/'";
            // const api = `${proxy}https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${long}`;
            // //${proxy}https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${long}&params=${params}

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`

            fetch(api)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                
                //setting DOM elements from API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //setting icon
                setIcons(icon, document.querySelector('.icon'));

                //changing temperatures to celsius/ fahrenheit

                let tempC = (temperature - 32) * (5 / 9);
                temperatureDegreeSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(tempC);
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        })
        
        //fucntion to set icons
        function setIcons (icon, iconId) {
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/./g, "_").toUpperCase().locationTimezone   //regex to look for every line and replace with '_'
            
            skycons.play();
            return skycons.set(iconId, skycons[currentIcon]);
        }

    }


})



















