const iconElem=document.querySelector(".weather-icon");
const tempvalElem=document.querySelector(".temperature-value p");
const tempdescElem=document.querySelector(".temperature-description p");
const locaElem=document.querySelector(".location p");
const notiElem=document.querySelector(".notification");
const weather={};
weather.temperature={
  units:"celsius"
}
const key="c245315efc985d98d750c52a6dda1ff9";
if("geolocation"in navigator)
 {
   navigator.geolocation.getCurrentPosition(setPosition,showError);
 }
 else
 {
   notiElem.style.display="block";
   notiElem.innerHTML="<p>Browser doesn't Support GEOLOCATION</p>";
 }
 function setPosition(position){
   let latitude=position.coords.latitude;
   let longitude=position.coords.longitude;
   getWeather(latitude,longitude);
 }
 function showError(error){
   notiElem.style.display="block";
   notiElem.innerHTML=`<p> ${error.message} </p>`;
 }
 function getWeather(latitude,longitude){
   let api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;
   fetch(api)
     .then(function(res){
       let data=res.json();
       return data;
     })
     .then(function(data){
       weather.temperature.value=Math.floor(data.main.temp);
       weather.description=data.weather[0].description;
       weather.iconId=data.weather[0].icon;
       weather.city=data.name;
       weather.country=data.sys.country;
     })
     .then(function(){
       displayWeather();
     })
 }
 function displayWeather(){
   iconElem.innerHTML=`<img src="${weather.iconId}.png"/>`;
   tempvalElem.innerHTML=`${weather.temperature.value}°<span>C</span>`;
   tempdescElem.innerHTML=weather.description;
   locaElem.innerHTML=`${weather.city},${weather.country}`;
 }
tempvalElem.addEventListener("click",function(){
  if(weather.temperature.value === undefined) return;

  if(weather.temperature.unit == "celsius"){
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);

      tempvalElem.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.temperature.unit = "fahrenheit";
  }else{
    tempvalElem.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = "celsius"
  }
})
function celsiusToFahrenheit(temperature){
  return (temperature * 9/5) + 32;
}
