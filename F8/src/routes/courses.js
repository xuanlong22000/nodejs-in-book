const express = require('express')
const router = express.Router()

const CourseController = require('../app/controllers/CourseController')

router.get('/create', CourseController.create)
router.post('/store', CourseController.store)
router.get('/:id/edit', CourseController.edit)
router.post('/handle-form-actions', CourseController.handleFormAction)
router.put('/:id', CourseController.update)
router.patch('/:id/restore', CourseController.restore)
router.delete('/:id', CourseController.destroy)
router.delete('/:id/force', CourseController.forceDestroy)
router.get('/:slug', CourseController.show)

module.exports = router