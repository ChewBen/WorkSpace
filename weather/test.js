const weather = require('./index')


weather('北京')
    .then(data => {
        console.log(data)
    }).catch(err => {
    console.log(err)
})