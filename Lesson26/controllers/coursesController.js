const Course = require("../models/course");
const passport = require("passport")

module.exports = {
    index: (req, res) => {
        Course.find({})
            .then(courses => {
                if (req.query.format === "json") {
                    res.json(res.locals.courses = courses);
                } else {
                    res.send('Fail')
                }
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`)
                res.redirect("/");
            });
    }
}