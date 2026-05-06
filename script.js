const API_KEY = "e7c1c3040baf3f22fad2760c16792a28";

document.getElementById("city").addEventListener("keydown", e => {
  if (e.key === "Enter") getWeather();
});

async function getWeather() {
  const city = document.getElementById("city").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weather-icon").src =
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("weather-card").style.display = "block";
    document.getElementById("error-msg").textContent = "";

  } catch (err) {
    document.getElementById("error-msg").textContent = err.message;
    document.getElementById("weather-card").style.display = "none";
  }
}