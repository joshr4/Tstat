const adc = require('./ads1115')

var stat = {}

stat.update = () => {
    adc.ch0()
    .then(data => {
        stat.ch0 = data
        console.log(stat.ch0)
    });
    
}

stat.start = () => {
    setInterval(stat.update, 1500)
}

module.exports = stat;
