// getting elements
image = document.querySelector(".cloud").firstElementChild;
win = document.querySelector(".wind").children[1];
temperature = document.querySelector(".temperature");
humi = document.querySelector(".humidity").children[1];
pres = document.querySelector(".pressure").children[1];
about = document.querySelector(".top");
month = document.querySelector(".left").firstElementChild;
date = document.querySelector(".left").lastElementChild;
city = document.querySelector(".text");
input = document.querySelector(".input").firstElementChild;
lon = document.querySelector(".lon");
lat = document.querySelector(".lat");
apikey = "18e373448c66c3a12cd762ca4d0baac7";
proxy = "https://cors-anywhere.herokuapp.com/";

let options = { proxy: proxy };

// adding event listeners
input.addEventListener("keydown", getweather);

// function for making api calls
async function apicall(url) {
  try {
    res = await fetch(url, options);
    data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// callback functions
async function getweather(event) {
  inputvalue = this.value;
  if (event.key === "Enter") {
    url = `http://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=${apikey}&units=metric`;
    data = await apicall(url);
    putdata(data);
  }
}

// function to place data retrived into the dom
function putdata(info) {
  data = info;
  // grabbing the data
  try {
    let { humidity, pressure, temp } = data.main;
    let wind = data.wind.speed;
    let abbrev = data.sys.country;
    let country = data.name;
    let latitude = data.coord.lat;
    let longitude = data.coord.lon;
    let summary = data.weather[0].description;
    iconid = data.weather[0].icon;
    let icon = `http://openweathermap.org/img/wn/${iconid}@2x.png`;

    // inserting into the dom
    image.src = icon;
    temperature.innerHTML = `${temp.toFixed()} <span id="degree"></span>`;
    win.textContent = `${wind}M/S`;
    humi.textContent = `${humidity}%`;
    pres.textContent = `${pressure} Pa`;
    about.textContent = summary;
    city.textContent = `${country}  ${abbrev}`;
    lat.textContent = `Latitude : ${latitude}`;
    lat.textContent = `Longtitude : ${longitude}`;

    // setting the date
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    d = new Date();
    day = d.getDate();
    mnth = d.getMonth();
    monthtext = monthNames[mnth];
    month.textContent = monthtext;
    date.innerHTML = day;
  } catch (e) {
    alert("you entered a wrong location, please check and try again");
    console.log(e);
  }
}

// loading users location's weather when page loads
document.addEventListener("DOMContentLoaded", function () {
  (async function getweather() {
    inputvalue = "accra";
    url = `http://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=${apikey}&units=metric`;
    data = await apicall(url);
    putdata(data);
  })();
});
