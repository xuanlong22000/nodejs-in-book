const port = 3000
const http = require('http')
const httpStatus = require('http-status-codes')
const contentTypes = require('./contentTypes')
const router = require('./router')
const utils = require('./utils')

router.get('/', (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html)
    utils.getFile('./views/index.html', res)
})

router.get('/contact.html', (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html)
    utils.getFile('./views/contact.html', res)
})

router.post("/", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.html);
    utils.getFile("views/thanks.html", res);
});

router.get("/Bui_Xuan_Long_2k.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/Bui_Xuan_Long_2k.JPG", res);
});

router.get("/Long_F18.jpg", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.jpg);
    utils.getFile("public/images/Long_F18.JPG", res);
});

router.get("/style.css", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.css);
    utils.getFile("public/css/style.css", res);
});

router.get("/confetti_cuisine.js", (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.js);
    utils.getFile("public/js/confetti_cuisine.js", res);
});

http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number: ${port}`);