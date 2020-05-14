const request = require('request')


const geocode=(address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2h3ZXRhazIwIiwiYSI6ImNrOXVxeThweDA0N28zcm53eDBsc2FyOTkifQ.Z1ARoGYBo3Hc5bbkh9LgGQ&limit=1'
    //request({url:geocodingurl,json:true},(error,response)=>{
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('unable to connect with given location',undefined)
        }else if(body.features.length===0){
            callback('unable to find location. try another search',undefined)
        }else{
            callback(undefined,{
                latitide: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location : body.features[0].place_name
                
            })
        }
    })
}

module.exports = geocode