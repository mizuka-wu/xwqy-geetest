var express = require('express');
var app = express();
var spider = require('./util')

app.get('/:keyword', (req, res) => {
    var keyword = req.params.keyword
    spider(keyword)
        .then(result => res.send(result))
        .catch(e => res.status(500).send(e.message))
})

app.listen(4001);