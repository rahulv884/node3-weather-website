const request = require('request')
const geocode = (address,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoicmFodWxjb2RlIiwiYSI6ImNsNG92bDJtejA5OGUzam1udGUwbGd2bXoifQ.fbi1g0sDtsswc_JTzsNsoA&limit=1"

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect location service',undefined)
        }
        else if(body.features.length === 0)
        {
            callback('Unable to find location try another search',undefined)
        }
        else{
            callback(undefined,{
                'longitude':body.features[0].center[1],
                'latitude':body.features[0].center[0],
                'location' : body.features[0].place_name
            })
        }
    })

}

module.exports = geocode