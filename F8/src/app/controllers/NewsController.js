class NewsController {
    index(req, res) {
        res.render('news')
    }

    show(req, res) {
        res.send('NEW DETAILS')
    }
}

module.exports = new NewsController