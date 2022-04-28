const port = 3000
const express = require('express')
const app = express()
const homeController = require('./homeController')

// app.get('/items/:vegetables', (req, res) => {
//     let veg = req.params.vegetables
//     res.send(`Page for ${veg}`)
// })

// app.use((req, res, next) => {
//     console.log(`req made to: ${req.url}`)
//     next()
// })

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())

app.post('/', (req, res) => {
    console.log(req.body)
    // console.log(req.query)
    res.send('POST Successful')
})

app.get("/items/:vegetable", homeController.sendReqParam);

app.listen(port, () => { console.log(`Server running on port ${port}`) })