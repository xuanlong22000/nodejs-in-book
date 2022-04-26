const port = 3000
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello World!!!</h1>')
})
    .listen(port, () => {
        console.log(`The Express.js server has started and is listening on port number: ${port}`);
    })

