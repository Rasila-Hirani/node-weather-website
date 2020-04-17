const request =require('request')

const geocode=(country,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=992afebd6d1df33600a1427e97eb1437&query='+country+''
    
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