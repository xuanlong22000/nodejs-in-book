const port = 3000
const http = require('http')
const httpStatus = require('http-status-codes')
const app = http.createServer()
app.on('request', (req, res) => {

    var body = []
    req.on('data', (bodyData) => {
        body.push(bodyData)
    })

    req.on('end', () => {
        body = Buffer.concat(body).toString()
        console.log(`Request body Content: ${body}`)
    })

    console.log(`Method: ${req.method}`)
    console.log(`URL: ${req.url}`)
    console.log(`Headers: ${req.headers}`)

    res.writeHead(httpStatus.OK, {
        'Content-Type': 'text/html'
    })

    let responseMessage = "<h1>This will show on the screen.</h1>"
    res.end(responseMessage)
})

app.listen(3000)
console.log(`Server is listening on port ${port}`)
