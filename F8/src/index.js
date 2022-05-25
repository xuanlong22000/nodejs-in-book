const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const route = require('./routes')
const SortMiddleWares = require('./app/middlewares/SortMiddleWares')
const methodOverride = require('method-override')
const handlebars = require('express-handlebars')
const db = require('./config/db')

//Connect DB
db.connect()


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(methodOverride('_method'))

app.use(SortMiddleWares)

//HTTP engine
// app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: "main",
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default'

            const icons = {
                default: 'oi oi-elevator',
                asc: 'oi oi-sort-ascending',
                desc: 'oi oi-sort-descending'
            }

            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            }

            const icon = icons[sortType]
            const type = types[sortType]

            return `
                <a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>
            `
        }
    }
}));
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