const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app =express()
const port =process.env.PORT || 3000
//Define path for Express config
const publicDirectoryPath =path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../template/views')
const partialPath = path.join(__dirname,'../template/partials')

//setup handlebars engine and views location
app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Rasila'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Rasila'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Rasila',
        helpText:'Help article '
    })
})
app.get('/weather',(req,res)=>{
  
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
  
   
    geocode(req.query.address, (error, {longitutude,latitute,location}={}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitutude,latitute, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }           
            res.send({               
                location :forecastdata.location,
                weather:forecastdata.weather,
                temperature:forecastdata.temperature,
                weather_icon:forecastdata.weather_icon,
                rainchance:forecastdata.rainchance,
            })
           
        })
    })

})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:'404 Page',
        name:'Rasila',
        errormessage:'Help article not found'
    })
})
app.get('*',(req,res) =>{
    res.render('404',{
        title:'404 Page',
        name:'Rasila',
        errormessage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server running on port:'+port)
})