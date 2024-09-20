async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = '5fe36b192ffd1c36dffb6752bc1722b2';  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('City not found');
    const weatherData = await response.json();
    
    displayWeather(weatherData);
  } catch (error) {
    document.getElementById('weatherResult').innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
  }
}


function displayWeather(data) {
  
  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  const weatherHtml = `
    <div class="weather-info">
      <h2>${data.name}, ${data.sys.country}</h2>
    
      <p><strong>Latitude:</strong> ${data.coord.lat}°</p>
      <p><strong>Longitude:</strong> ${data.coord.lon}°</p>
      <p><strong>Temperature:</strong> ${data.main.temp.toFixed(2)} °C</p>
      <p><strong>Feels Like:</strong> ${data.main.feels_like.toFixed(2)} °C</p>
      <p><strong>Min Temperature:</strong> ${data.main.temp_min.toFixed(2)} °C</p>
      <p><strong>Max Temperature:</strong> ${data.main.temp_max.toFixed(2)} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <img src="${weatherIcon}" alt="Weather Icon">
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed.toFixed(2)} m/s</p>
      <p><strong>Cloudiness:</strong> ${data.clouds.all}%</p>
      <p><strong>Visibility:</strong> ${(data.visibility / 1000).toFixed(2)} km</p>
      <p><strong>Sunrise:</strong> ${sunriseTime}</p>
      <p><strong>Sunset:</strong> ${sunsetTime}</p>
    </div>
  `;
  
  document.getElementById('weatherResult').innerHTML = weatherHtml;
}
