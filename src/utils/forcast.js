const request = require('request')

const forcast = (latitude,longitude,callback)=>{

    const url = "http://api.weatherstack.com/current?access_key=4880740dc63a0a5df961a62b7e222bb4&query="+ latitude +","+ longitude +"&units=f"

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Weather api is enable',undefined)
        }
        else if(body.error){
            callback('Location don`t find',undefined)
        }
        else{
            callback(undefined,{
                'Description':body.current.weather_descriptions[0],
                'Temperature' :body.current.temperature,
                'Feelslike' :body.current.feelslike
            })
        }
    })

}
module.exports = forcast