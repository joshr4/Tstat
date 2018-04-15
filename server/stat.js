const adc = require('./ads1115')

var stat = {
    //constants
    minRunTime: 8, //minimum time to let the heater run, in seconds
    minOffTime: 8, //minimum time before turning heater back on, in seconds
    deadband: 2, //amount temp must rise above setpoint before heater turns off

    //variables
    curDate: new Date,
    lastOn: curDate.getTime() / 1000,
    lastOff: curDate.getTime() / 1000 - minOffTime,
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


//setup schedules  moment JS
// for (var i = 0; i < 6; i++) { //0=sunday, 6=saturday
//     this.occSch[i] = {};
//     this.unccSch[i] = {};
//     for (var j = 0; j < 4; j++) { //0=unoccsleep, 1=occmorning, 2=unoccday, 3=occnight, 4=unoccsleep 
//         this.occSch[i][j] = { start: '00:00', end: '00:00' };
//         this.unoccSch[i][j] = { start: '00:00', end: '00:00' };
//     }
// }
// }

stat.heatOn = function () { 
    if (stat.lastOff + stat.minOffTime < Date.getTime() / 1000) {
        //turn on heat
        console.log('heat on')
        stat.lastOn = Date.getTime() / 1000;
    }
}

stat.heatOff = function () {
    if (stat.lastOn + stat.minOnTime < Date.getTime() / 1000) {
        //turn off heat
        console.log('heat off')        
        stat.lastOff = Date.getTime() / 1000;
    }
}

// tstat.prototype.setSchedule = function () {

//     var weekday = $('#weekday').val();
//     var start = $('#start-time').val();
//     var end = $('#end-time').val();
//     this.occSch[weekday] = { start: start, end: end };
// }

// tstat.prototype.enabled = function () { //run this main function when stat is enabled

//     this.getTstat(); //update temp and setpoint

//     if (this.occSch[Date.getDay()].start < Date.getTime) {
//         if (this.temperature < this.occSetpoint - this.deadband / 2) {
//             this.heatOn();
//         }

//         if (this.temperature > this.occSetpoint + this.deadband / 2) {
//             this.heatOff();
//         }
//     }


// }

module.exports = stat;
