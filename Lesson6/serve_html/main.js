const port = 3000
const http = require('http')
const httpStatus = require('http-status-codes')
const fs = require('fs')
const router = require('./router')

const plainTextContentType = {
    "Content-Type": "text/plain"
}

const htmlContentType = {
    "Content-Type": "text/html"
}

const customReadFile = (file, res) => {
    fs.readFile(`${file}`, (error, data) => {
        if (error) {
            console.log("Error reading the file...");
        }
        res.end(data);
    })
}

router.get('/', (req, res) => {
    res.writeHead(httpStatus.OK, plainTextContentType)
    res.end('INDEX')
})

router.get('/index.html', (req, res) => {
    res.writeHead(httpStatus.OK, htmlContentType)
    customReadFile('views/index.html', res)
})

router.post('/', (req, res) => {
    res.writeHead(httpStatus.OK, plainTextContentType)
    res.end('POST')
})

http.createServer(router.handle).listen(port)

console.log(`The server is listening on port number: ${port}`);

// 1
// const routeMap = {
//     '/': 'views/index.html'
// }

// 2
// const getViewURL = (url) => {
//     return `views${url}.html`
// }

// http.createServer((req, res) => {
//     // 1
//     // res.writeHead(httpStatus.OK, {
//     //     'Content-Type': 'text/html'
//     // })
//     // if (routeMap[req.url]) {
//     //     fs.readFile(routeMap[req.url], (error, data) => {
//     //         res.write(data)
//     //         res.end()
//     //     })
//     // } else {
//     //     res.end("<h1>Sorry, not found.</h1>");
//     // }

//     // 2
//     let viewURL = getViewURL(req.url)
//     fs.readFile(viewURL, (error, data) => {
//         if (error) {
//             res.writeHead(httpStatus.NOT_FOUND)
//             res.write("<h1>FILE NOT FOUND</h1>");
//         } else {
//             res.writeHead(httpStatus.OK, {
//                 'Content-Type': 'text/html'
//             })
//             res.write(data)
//         }
//         res.end()

//     })
// }).listen(port)

// console.log(`The server has started and is listening on port number: ${port}`);


