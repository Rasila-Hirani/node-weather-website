
//const url = 'http://api.weatherstack.com/current?access_key=992afebd6d1df33600a1427e97eb1437&query='


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const w_icon = document.querySelector('#weather-icon')
const weather = document.querySelector('#weather')
const temperature = document.querySelector('#temperature')
const rainchance = document.querySelector('#rainchance')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent="Loading....."
    w_icon.src=''
    weather.textContent=''
    temperature.textContent=''
    rainchance.textContent=''
    fetch('/weather?address='+location).then((response) => {
       
        response.json().then((data) => {
            if(response.status !== 200){
                console.log('Looks like there was a problem. Status Code: ' +response.status);
              return;
            }
            if (data.error) {
                messageOne.textContent=data.error
            } else {
                messageOne.textContent=data.location
                w_icon.src=data.weather_icon
                weather.textContent=data.weather
                temperature.textContent="Temperature: "+data.temperature+" ℃"
                rainchance.textContent="Rain Chance: "+data.rainchance              
               
            }
        })
           
    })  
    .catch((err)=>{
        console.log('Fetch Error :-S', err)
    })    
}) 