const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

router.get('/', async (req, res) => {
    const showData = await Post.find({})
    res.json(showData)
})

router.post('/', async (req, res) => {
    const post = await Post.create({
        title: req.body.title,
        description: req.body.description
    })


    res.json(post)
})

router.get('/:id', async (req, res) => {
    const showData = await Post.findOne({ _id: req.params.id })
    res.json(showData)
})

router.delete('/delete/:id', async (req, res) => {
    await Post.deleteOne({ _id: req.params.id })

    console.log(`Delete data have id ${req.params.id}`)
})

router.patch('/update/:id', async (req, res) => {
    await Post.updateOne({ _id: req.params.id }, { $set: { title: req.body.title } })
    console.log(`Data have id ${req.params.id} updated`)
})

module.exports = router