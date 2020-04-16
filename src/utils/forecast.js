const request =require('request')

//longitude = -0.1233
//latitude =51.56644
const forecast=(longitude ,latitude ,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=314dba1f7ce9b795db07d72e2cd0bbb2&query='+latitude+','+longitude+''
    
    request({url :url,json :true},(error,response)=>{
             if(error){
           callback('Unable to connect to weather service!',undefined)
       }else if(response.body.error){
           callback('Unable to find location',undefined)
       }
       else{
           callback(undefined,{            
            weather : response.body.current.weather_descriptions,
            temperature : response.body.current.temperature,
            rainchance: response.body.current.precip
           })
       }
    })

}
module.exports=forecast