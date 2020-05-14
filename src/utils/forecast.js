const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=599c4fb1e3a262a25ef15855770ab7c3&query='+latitude+','+longitude+'&units=f'
    //37.8287,-122.4233
    //request({url: url ,json:true},(error,response)=>{
    request({url ,json:true},(error,{body}={})=>{                //with ES6   body = response.body
        if(error){
            callback('unable to connect with location service',undefined)
        }else if(body.error){
            callback('unable to find given location',undefined)
        }else{
            callback(undefined,{
                //address: body.location.name,
                info: body.current.weather_descriptions[0]+'. its currently ' +body.current.temperature+' outer neight and feels like '  +body.current.feelslike+ ' out',
                infor: console.log(body.current.weather_descriptions[0]+'. its currently ' +body.current.temperature+' outer neight and feels like '  +body.current.feelslike+ ' out')
            })
        }
    })
}

module.exports = forecast
// forecast(-75.7088,44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })
// forecast(18.52361,73.84778, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })