const port = 3000
const http = require('http')
const httpStatus = require('http-status-codes')
const fs = require('fs')

const htmlContentType = {
    'Content-Type': 'text/html'
}

const routes = {
    "GET": {
        "/info": (req, res) => {
            res.writeHead(httpStatus.OK, {
                "Content-Type": "text/plain"
            })
            res.end("Welcome to the Info Page!")
        }
    },
    'POST': {}
};

// const sendErrorResponse = res => {
//     res.writeHead(httpStatus.NOT_FOUND, {
//         'Content-Type': 'text/html'
//     })
//     res.write("<h1>File Not Found!</h1>");
//     res.end();
// }

// http.createServer((req, res) => {
//     let url = req.url
//     if (url.indexOf('.html') !== -1) {
//         res.writeHead(httpStatus.OK, {
//             'Content-Type': 'text/html'
//         })
//         customReadFile(`./views${url}`, res)
//     } else if (url.indexOf('.js') !== -1) {
//         res.writeHead(httpStatus.OK, {
//             'Content-Type': 'text/javascript'
//         })
//         customReadFile(`./public/js${url}`, res)
//     } else if (url.indexOf('.css') !== -1) {
//         res.writeHead(httpStatus.OK, {
//             'Content-Type': 'text/css'
//         })
//         customReadFile(`./public/css${url}`, res)
//     } else if (url.indexOf('.png') !== -1) {
//         res.writeHead(httpStatus.OK, {
//             'Content-Type': 'img/png'
//         })
//         customReadFile(`./public/images${url}`, res)
//     }
//     else {
//         sendErrorResponse(res)
//     }
// }).listen(port)

// console.log(`The server is listening on port number: ${port}`);

// const customReadFile = (file_path, res) => {
//     if (fs.existsSync(file_path)) {
//         fs.readFile(file_path, (error, data) => {
//             if (error) {
//                 console.log(error)
//                 sendErrorResponse(res)
//                 return
//             }
//             res.write(data)
//             res.end()
//         })
//     } else {
//         sendErrorResponse(res)
//     }
// }

exports.handle = (req, res) => {
    try {
        if (routes[req.method][req.url]) {
            routes[req.method][req.url](req, res);
        } else {
            res.writeHead(httpStatus.NOT_FOUND, htmlContentType);
            res.end("<h1>No such file exists</h1>");
        }
    } catch (ex) {
        console.log("error: " + ex);
    }
};
exports.get = (url, action) => {
    routes["GET"][url] = action;
};
exports.post = (url, action) => {
    routes["POST"][url] = action;
};