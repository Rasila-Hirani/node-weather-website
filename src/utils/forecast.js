const request =require('request')

//longitude = -0.1233
//latitude =51.56644
const forecast=(longitude ,latitude ,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=992afebd6d1df33600a1427e97eb1437&query='+latitude+','+longitude+''
    
    request({url :url,json :true},(error,response)=>{        
        if(error){
           callback('Unable to connect to weather service!',undefined)
       }else if(response.body.error){
           callback('Unable to find location',undefined)
       }
       else{
            let disp_loaction=response.body.location
           callback(undefined,{             
            location :disp_loaction.name+","+disp_loaction.country,                       
            weather : response.body.current.weather_descriptions,
            temperature : response.body.current.temperature,
            weather_icon:response.body.current.weather_icons,
            rainchance: response.body.current.precip,
           
           })
       }
    })

}
module.exports=forecast