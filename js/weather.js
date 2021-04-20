const weather = document.querySelector(".js-weather"); // 해당 클래스명을 가지는 곳에 이하의 function을 적용한다.

const API_KEY = "425a6d02b35cd872425e6c4dfe82d374";
const COORDS = 'coords';

function getWeather(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function (rsp) {
    return rsp.json();
  }).then(function (json){
    const tmp = json.main.temp;
    const place = json.name;
    weather.innerText = `${tmp} ºC @ ${place}`
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude // 위도
  const longitude = position.coords.longitude // 경도
  const coordsObj = { // 위도,경도 변수를 하나로 묶어 객체로 만듬.
    latitude,
    longitude
  };
  // 위에서 만든 객체를 localStorage 이용하여 저장하기 위해 saveCoords로 보냄.
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("위치를 찾을 수 없습니다.")
}


function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}


function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}


function init() {
  loadCoords();
}

init();
