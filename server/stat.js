const adc = require('./ads1115')

var stat = {}

stat.update = () => {
    adc.ch0()
        .then(data => {
            stat.ch0 = data
            console.log('ch0 ', stat.ch0)
        });
    setTimeout(() => adc.ch1()
        .then(data => {
            stat.ch1 = data
            console.log('ch1 ', stat.ch1)
        }), 1500)
}

stat.start = () => {
    setInterval(stat.update, 4000)
}

module.exports = stat;
