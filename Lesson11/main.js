const errorController = require('./errorController')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static("public"))
app.use(errorController.respondNoResourceFound);
// app.use(errorController.respondInternalError);


app.listen(port, () => { console.log(`Sever running on port ${port}`) })