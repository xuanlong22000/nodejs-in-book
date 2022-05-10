const newsRouter = require('./news')
const siteRouter = require('./site')

const routes = (app) => {
    app.use('/news', newsRouter)
    app.use('/', siteRouter)
}

module.exports = routes