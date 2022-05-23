const Courses = require('../models/Courses')
const { mongooseToObject } = require('../../util/mongoose')

exports.show = (req, res, next) => {
    Courses.findOne({ slug: req.params.slug })
        .then(course => {
            res.render('courses/show', { course: mongooseToObject(course) })
        })
        .catch(next)
}

exports.create = (req, res, next) => {
    res.render('courses/create')
}

exports.store = (req, res, next) => {
    // res.json(req.body)
    // console.log(formData)
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    const course = new Courses(req.body)
    course.save()
        .then(() => {
            res.redirect('/me/stored/courses')
            // console.log(formData)
        })
        .catch((error) => { console.log(error) })
}

exports.edit = (req, res, next) => {
    Courses.findById(req.params.id)
        .then((course) => { res.render('courses/edit', { course: mongooseToObject(course) }) })
}

exports.update = (req, res, next) => {
    Courses.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect('/me/stored/courses'))
}

exports.destroy = (req, res, next) => {
    Courses.delete({ _id: req.params.id })
        .then(() => res.redirect('back'))
}

exports.restore = (req, res, next) => {
    Courses.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
}

exports.forceDestroy = (req, res, next) => {
    Courses.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
}

exports.handleFormAction = (req, res, next) => {
    switch (req.body.action) {
        case 'delete':
            Courses.delete({ _id: { $in: req.body.courseIds } })
                .then(() => res.redirect('back'))
            break
        default:
            res.send('Error')
    }
}