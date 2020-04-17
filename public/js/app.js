
const url = 'http://api.weatherstack.com/current?access_key=314dba1f7ce9b795db07d72e2cd0bbb2&query=boston'


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent="Loading....."
    messageTwo.textContent=''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(response.status !== 200){
                console.log('Looks like there was a problem. Status Code: ' +response.status);
              return;
            }
            if (data.error) {
                messageOne.textContent=data.error
            } else {
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
           
    })  
    .catch((err)=>{
        console.log('Fetch Error :-S', err)
    })    
}) 