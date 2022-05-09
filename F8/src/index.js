const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const route = require('./routes')
const handlebars = require('express-handlebars')


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//HTTP engine
// app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars.engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './resources/views'));

// app.get('/', (req, res) => {
//     res.render('home')
// })

// app.get('/news', (req, res) => {
//     res.render('news')
// })

// app.get('/search', (req, res) => {
//     // console.log(req.query.q)
//     res.render('search')
// })

// app.post('/search', (req, res) => {
//     console.log(req.body)
//     res.send('')
// })

route(app)

app.listen(3000, () => { console.log(`Server running on port 3000`) })