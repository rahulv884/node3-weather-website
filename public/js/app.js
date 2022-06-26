
fetch('http://localhost:3000/weather?address=Indore').then((response) =>{
    response.json().then((data)=>{
        if(data.error)
        {
            console.log('Error',data.error)
        }
        else{
            console.log('location:',data.location)
            console.log('forecast:',data.forecast)
        }
    })
})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgFirst = document.querySelector('#message-1')
const msgSecond = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
e.preventDefault()
const location = search.value
fetch('/weather?address='+location).then((response) =>{
    response.json().then((data)=>{
        msgFirst.textContent = 'Loading...'
        if(data.error)
        {
            msgFirst.textContent = 'Error:'+data.error
            msgSecond.textContent = ''
            console.log('Error',data.error)
        }
        else{
            msgFirst.textContent = 'Location:'+data.location
            msgSecond.textContent = 'forecast:'+data.forecast
        }
    })
})
})