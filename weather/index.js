const axios = require("axios")

function getWeather(city) {
    return new Promise((resolve, reject) => {
        axios.get('https://api2.jirengu.com/getWeather.php?city=${city} ')
            .then(response => {
                console.log(response)
                resolve(response)
            })
            .catch(e=> {
                reject=> ('网络异常')
            })
    })
        .then(function () {
            // always executed
        })
}

module.exports = getWeather