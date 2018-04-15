const ads1x15 = require('node-ads1x15');
const Promise = require('bluebird')
const chip = 1; //0 for ads1015, 1 for ads1115  

//Simple usage (default ADS address on pi 2b or 3):
const adc = new ads1x15(chip);

// Optionally i2c address as (chip, address) or (chip, address, i2c_dev)
// So to use  /dev/i2c-0 use the line below instead...:

//const adc = new ads1x15(chip, 0x48, 'dev/i2c-0');

//const channel = 0; //channel 0, 1, 2, or 3...  
const samplesPerSecond = '250'; // see index.js for allowed values for your chip  
const progGainAmp = '4096'; // see index.js for allowed values for your chip  

//read ch
adc.readCh = (channel) => {
    return new Promise(function (resolve) {
        if (!adc.busy) {
            adc.readADCSingleEnded(channel, progGainAmp, samplesPerSecond, function (err, data) {
                if (err) {
                    //logging / troubleshooting code goes here...  
                    throw err;
                }
                resolve(data)
            })
        }
    });
}

adc.readContCh = (channel) => {
    return new Promise(function (resolve) {
        if (!adc.busy) {
            adc.startContinuousConversion(channel, progGainAmp, samplesPerSecond, function (err, data) {
                if (err) {
                    //logging / troubleshooting code goes here...  
                    throw err;
                }
                resolve(data)
            })
        }
    });
}

adc.readContChTest = (channel) => {
    if (!adc.busy) {
        adc.startContinuousConversion(channel, progGainAmp, samplesPerSecond, function (err, data) {
            if (err) {
                //logging / troubleshooting code goes here...  
                throw err;
            }
            console.log('datatest ', data)

            return data
        })
    }
}
console.log('test ', adc.readContChTest(0))
//ads1x15.prototype.startContinuousConversion = function(channel, pga, sps, callback) {

adc.updateChannels = () => {
    var output = {}

    console.log('readch ', adc.readCh(0))
    return output
}
// if you made it here, then the data object contains your reading! 
//Vin--R1--Vout--R2--Gnd
//Vout = Vin*(R2/(R2+R1))
//Vout(R2+R1)/Vin=R2
//Vout*R1/Vin = R2 - Vout*R2/Vin
//R1 = (Vin*R2)/Vout - R2
//resistor = 8.19 kohm

//dial setpoint
//var dial = (data - 873) / -9.28
//Tstat dial * (end) = 11.75, 85F = 80, 70F = 233, 60F = 313, 50F = 407.5, ** (end) = 460.5
//data = -9.28*dial + 873

module.exports = adc;
