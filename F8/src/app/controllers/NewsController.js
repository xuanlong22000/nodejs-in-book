exports.index = (req, res) => {
    res.render('news')
}

exports.show = (req, res) => {
    res.send('NEW DETAILS')
}