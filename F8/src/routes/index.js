const newsRouter = require('./news')
const siteRouter = require('./site')

const router = (app) => {
    app.use('/news', newsRouter)
    app.use('/', siteRouter)
}

module.exports = router