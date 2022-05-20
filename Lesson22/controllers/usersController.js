const User = require("../models/user");
const getUserParams = (body) => {
    return {
        name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        password: body.password,
        zipCode: parseInt(body.zipCode)
    }
}
module.exports = {
    new: (req, res) => {
        res.render('users/new')
    },

    index: (req, res) => {
        User.find({})
            .then(users => {
                res.render("users/index", {
                    users: users,
                    flashMessages: {
                        success: "Loaded all users"
                    }
                })
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`)
                res.redirect("/");
            });
    },

    edit: (req, res, next) => {
        let userId = req.params.id
        User.findById(userId)
            .then(user => {
                res.render('users/edit', { user: user })
            })
            .catch(error => {
                console.log(`Error updating user by ID: ${error.message}`);
                next(error);
            });

    },

    create: (req, res, next) => {
        let userParams = getUserParams(req.body)
        User.create(userParams)
            .then((user) => {
                req.flash("success", `${user.fullName}'s account created successfully !`)
                res.locals.redirect = '/users'
                next()
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`);
                res.locals.redirect = "/users/new";
                req.flash("error", `Failed to create user account because: ${error.message}.`);
                next(error);
            });
    },

    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.render("users/show", { user: user });
                next();
            })
            .catch(error => {
                console.log(`Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },

    update: (req, res, next) => {
        let userId = req.params.id,
            userParams = {
                name: {
                    first: req.body.first,
                    last: req.body.last
                },
                email: req.body.email,
                password: req.body.password,
                zipCode: req.body.zipCode
            };
        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                res.locals.redirect = `/users/${userId}`;
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error updating user by ID: ${error.message}`);
                next(error);
            });
    },

    delete: (req, res, next) => {
        User.findByIdAndRemove(req.params.id)
            .then(() => {
                res.locals.redirect = '/users'
                next()
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    welcome: (req, res, next) => {
        res.render('welcome')
    }
};