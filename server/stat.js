const adc = require('./ads1115')

var stat = {}

stat.update = () => {
    adc.ch0()
        .then(data => {
            stat.ch0.raw = data
            adc.ch1()
                .then(data => {
                    stat.ch1.raw = data;
                    console.log(stat)
                })
        });
}

stat.start = () => {
    setInterval(stat.update, 3000)
}

module.exports = stat;
