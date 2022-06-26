const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 

//setup handlebar engine or view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Use this for weather information'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'Rahul Verma'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'How can i help you',
        name:'Rahul Verma'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'Adrees is required!'
        })
    }
    geocode(req.query.address,(error,{longitude, latitude, location} = {})=>{
        if(error)
        {
            return res.send({error})
        }
        else{
            forcast(longitude,latitude,(error,{Description,Temperature,Feelslike})=>{
                if(error)
                {
                    return res.send({ error })
                }
                else{
                    res.send({
                        forecast:Description,
                        location:location,
                        address:req.query.address
                    })
                }
            })
        }
    })

    
})
app.get('/help/*',(req,res) => {
    res.render('default',{
        title:'404',
        message:'Article not found!',
        name:'Rahul Verma'
    })
})
app.get('*',(req,res)=>{
    res.render('default',{
        title:'404',
        message:'Page not found!',
        name:'Rahul Verma'
    })
})

app.listen(3000,()=>{
    console.log('Server run on the port of 3000!')
})

