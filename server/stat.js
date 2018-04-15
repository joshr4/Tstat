const adc = require('./ads1115')

var stat = {}

stat.update = () => {
    stat.ch0 = adc.ch0()
    console.log('ch0 ', stat.ch0)
}

stat.start = () => {
    setInterval(stat.update, 1500)
}

module.exports = stat;
