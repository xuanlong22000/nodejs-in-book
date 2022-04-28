const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')

//HTTP engine
app.use(morgan('combined'))

//Template engine
app.engine('handlebars', handlebars.engine({ extname: 'handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './resources/views'));

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => { console.log(`Server running on port 3000`) })