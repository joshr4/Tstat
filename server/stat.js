const adc = require('./ads1115')
var curDate = new Date

var stat = {
    //constants
    minRunTime: 10000, //minimum time to let the heater run, in milli seconds
    minOffTime: 10000, //minimum time before turning heater back on, in milli seconds
    deadband: 2, //amount temp must rise above setpoint before heater turns off

    //variables
    lastOn: Date.now(),
    lastOff: Date.now() - 9000,
    temperature: null,
    activeSetpoint: 70,
    occSetpoint: 70,
    unoccSetpoint: 50,
    occSch: {},
    unoccSch: {},
    temp: { raw: 0, value: 70 },  //temp
    dial: { raw: 0, value: 65 }, //dial
}


stat.updateCh = () => {
    adc.ch0() //get temp
        .then(data => {
            stat.temp.raw = data
            stat.temp.value = 70
            adc.ch1() //get dial
                .then(data => {
                    stat.dial.raw = data;
                    stat.dial.value = (data - 873) / -9.28
                    stat.occSetpoint = stat.dial.value
                    console.log('Temp: ', stat.temp.value, 'Dial: ', stat.dial.value)
                })
        });
}

stat.compareTemp = () => {
    if (stat.temp.value < stat.occSetpoint) stat.heatOn()
    else stat.heatOff()
}

stat.start = () => {
    setInterval(stat.updateCh, 3000)
    setInterval(stat.compareTemp, 3000)
}


stat.heatOn = function () {
    if (stat.lastOff + stat.minOffTime < Date.now()) {
        console.log('heat on')
        stat.lastOn = Date.now();
    }
    else console.log('else 56')
}

stat.heatOff = function () {
    if (stat.lastOn + stat.minOnTime < Date.now()) {
        console.log('heat off')
        stat.lastOff = Date.now();
    }
    else console.log('else 63')

}

module.exports = stat;
