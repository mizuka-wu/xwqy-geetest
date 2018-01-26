var generatorCode = require('./creditCode')
var spider = require('./util')

function getData() {
    setTimeout(() => {
        // const code = generatorCode()
        const code = ''
        spider(code)
            .then(result => console.log(result))
            .catch(e => console.error('no such company'))
        getData()
    }, (Math.random() * 5000 + 2))
}

getData()