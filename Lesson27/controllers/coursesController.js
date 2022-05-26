const Course = require("../models/course");
const httpStatus = require("http-status-codes");
const User = require("../models/user");

module.exports = {
    index: (req, res, next) => {
        Course.find({})
            .then(courses => {

                res.json(res.locals.courses = courses);
                next()

            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`)
                res.redirect("/");
            });
    },

    join: (req, res, next) => {
        let courseId = req.params.id,
            currentUser = req.user;
        if (currentUser) {
            User.findByIdAndUpdate(currentUser, {
                $addToSet: {
                    courses: courseId
                }
            })
                .then(() => {
                    res.locals.success = true;
                    next();
                })
                .catch(error => {
                    next(error);
                });
        } else {
            next(new Error("User must log in."));
        }
    },

    filterUserCourses: (req, res, next) => {
        let currentUser = res.locals.currentUser;
        if (currentUser) {
            let mappedCourses = res.locals.courses.map((course) => {
                let userJoined = currentUser.courses.some((userCourse) => {
                    return userCourse.equals(course._id);
                });
                return Object.assign(course.toObject(), { joined: userJoined });
            });
            res.locals.courses = mappedCourses;
            console.log(res.locals.courses)
            next();
        } else {
            next();
        }
    },

    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },

    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    },


}