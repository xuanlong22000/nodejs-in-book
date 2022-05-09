const express = require('express')
const app = express()
const homeController = require('./controllers/homeController')
const errorController = require('./controllers/errorController')
const layout = require('express-ejs-layouts')

app.set("view engine", "ejs");
app.use(layout);
app.use(express.static("public"))


app.set('port', process.env.PORT || 3000)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.get('/', (req, res) => {
    res.send('Welcome to Long Home')
})

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.use(errorController.internalServerError)
app.use(errorController.pageNotFoundError)

app.listen(app.get('port'), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`)
})