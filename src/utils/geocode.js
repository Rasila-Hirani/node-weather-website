const request =require('request')

const geocode=(country,callback)=>{
    const url='https://api.weatherstack.com/current?access_key=314dba1f7ce9b795db07d72e2cd0bbb2&query='+country+''
    
    request({url :url,json :true},(error,response)=>{
        if(error){
           callback('Unable to connect to weather service!',undefined)
       }else if(response.body.error){
           callback('Unable to find location',undefined)
       }
       else{
           callback(error,{
            location :response.body.location.region,           
            latitute:response.body.location.lat,
            longitutude:response.body.location.lon
           })
       }
    })

}
module.exports=geocode