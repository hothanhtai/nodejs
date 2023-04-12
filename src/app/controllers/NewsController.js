class NewsController {
    //[GET] /news
    index(req, res, next) {
        res.render('new');
    }
    detail(req, res) {
        res.send('New details');
    }
}

module.exports = new NewsController();
