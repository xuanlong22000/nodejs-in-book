const port = 3000
const http = require("http")
const httpStatus = require("http-status-codes")

//Tao server voi 2 tham so req va res
const app = http.createServer((request, response) => {
    console.log("Received an incoming request!");

    //Viet phan hoi (response) den client(user)
    response.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });

    let responseMessage = "<h1>Hello World!</h1>";
    response.write(responseMessage);
    response.end();
    console.log(`Sent a response : ${responseMessage}`);
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
