const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 3000
const postRoute = require('./routes/post')

app.use(express.json())
mongoose.connect(
    "mongodb://localhost:27017/Rest_API",
    { useNewUrlParser: true },
    console.log('Connect Success')
)

app.use('/posts', postRoute)
app.get('/', (req, res) => {
    res.send('<h1>HEHEHEHEHEH</h1>')
})

app.listen(PORT, console.log('Server running on port https://localhost:3000'))