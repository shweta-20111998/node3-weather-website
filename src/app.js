const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// console.log(__dirname)
// //console.log(__filename)
// console.log(path.join(__dirname,'../public'))
const app = express()
const port = process.env.PORT || 3000

//define path for express config
const publicdirpath = path.join(__dirname,'../public')
const viewpath =path.join(__dirname,'../template/views')
const partialpath = path.join(__dirname,'../template/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)


//setup static directory to serve
app.use(express.static(publicdirpath))



app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app1',
        name: 'shweta k'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptxt:'this is for your help',
        title: 'help app1',
        name: 'shweta k'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'weather information here1',
        name:'shweta kulkarni'
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1>hello express</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'shweta',
//         age:21
//     },{
//         name:'shravani',
//         age:13
//     }])
// })

// app.get('/about',(req,res)=>{
//     // res.send('info about app')
//     res.send('<h1> about</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'error'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'its sunny here',
    //     location:'aurangabad',
    //     address: req.query.address
    // })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products :[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'error occure',
        name:'shweta',
        errormsg:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'error occure',
        name:'shweta',
        errormsg:'page not found'
    })
})

app.listen(port,()=>{
    console.log('server is up on port'+port)
})