window.addEventListener('load', () => {
  let long;
  let lat;
  let temperDescription = document.querySelector('.temperature-description');
  let temperDegree = document.querySelector('.temperature-degree');
  let locTimezone = document.querySelector('.location-timezone');
  let temperSection = document.querySelector('.temperature');
  const temperSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/e4458e52143585e171fa5afefdbcdc85/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently; // const {} = avoid use data.currently.temperature or .summary

          // Set DOM elements from the API

          temperDegree.textContent = temperature;
          temperDescription.textContent = summary;
          locTimezone.textContent = data.timezone;

          // Convert to Celsius
          let celsius = (temperature - 32) * (5 / 9);
          // set Icon
          setIcons(icon, document.querySelector('.icon'));

          // Change temp to Celsius/Farenheit
          
          temperSection.addEventListener('click', () => {
            if(temperSpan.textContent === "F") {
              temperSpan.textContent = "C";
              temperDegree.textContent = Math.floor(celsius);
            } else {
              temperSpan.textContent = "F";
              temperDegree.textContent = temperature;
            }

          });
          

        });
    });
  }

  function setIcons(icon, iconID) {
     const skycons = new Skycons({color: "white"});
     const currentIcon = icon.replace(/-/g, "_").toUpperCase(); // search for every line(-) and replace for underscore(_)
     skycons.play();
     return skycons.set(iconID, Skycons[currentIcon]);
  }
});