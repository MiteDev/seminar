const indexRoot = (req, res) => {
    if(req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.render('index', {title : 'Session Example', count : req.session.count});
}

module.exports = {
    indexRoot
}