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
                res.redirect('/users')
                next()
            })
            .catch(error => {
                console.log(`Error saving user: ${error.message}`);
                res.redirect("/users/new")
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
                res.redirect(`/users/${userId}`)
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
                res.redirect('/users')
                next()
            })
            .catch(error => {
                console.log(`Error deleting user by ID: ${error.message}`);
                next();
            });
    },

    login: (req, res, next) => {
        res.render('users/login')
    },

    authenticate: (req, res, next) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                // if (user && user.password === req.body.password) {
                //     res.redirect(`/users/${user._id}`)
                //     req.flash('success', `${user.fullName}'s logged in successfully!`);
                //     next()
                // } else {
                //     req.flash("error", "Your account or password is incorrect.Please try again or contact your system administrator!");
                //     res.redirect('/users/login')
                //     next();
                // }

                if (user) {
                    user.passwordComparison(req.body.password)
                        .then(passwordsMatch => {
                            if (passwordsMatch) {
                                res.redirect(`/users/${user._id}`)
                                req.flash("success", `${user.fullName}'s logged in successfully!`);
                            } else {
                                req.flash("error", "Failed to log in user account: Incorrect Password.");
                                res.redirect('/users/login')
                            }
                            next();
                        });
                } else {
                    req.flash("error", "Failed to log in user account: User account not found.");
                    res.redirect('/users/login')
                    next();
                }

            })
            .catch(error => {
                console.log(`Error logging in user: ${error.message}`);
                next(error);
            });
    },

    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({ all_lowercase: true }).trim()
        req.check("email", "Email is invalid").isEmail()
        req.check("zipCode", "zipCode is invalid").notEmpty().isInt().isLength({
            min: 5,
            max: 5
        }).equals(req.body.zipCode)
        req.check("password", "Password cannot be empty").notEmpty()

        req.getValidationResult().then(error => {
            if (!error.isEmpty()) {
                let messages = error.array().map(e => e.msg)
                req.skip = true
                req.flash("error", messages.join(" and "))
                res.redirect("/users/new")
                next()
            } else {
                next()
            }
        })
    },

    welcome: (req, res, next) => {
        res.render('welcome')
    }
};