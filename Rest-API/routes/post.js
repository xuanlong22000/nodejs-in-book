const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.post('/', (req, res) => {
    console.log(req.body)
})

module.exports = router