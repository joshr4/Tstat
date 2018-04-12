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

//somewhere to store our reading   
//var reading = 0;

adc.channels = [];

adc.readch0 = () => {
    return new Promise(function (resolve) {
        if (!adc.busy) {
            adc.readADCSingleEnded(0, progGainAmp, samplesPerSecond, function (err, data) {
                if (err) {
                    //logging / troubleshooting code goes here...  
                    throw err;
                }
                // if you made it here, then the data object contains your reading! 
                var dial = (data - 873) / -9.28
                //Tstat dial * (end) = 11.75, 85F = 80, 70F = 233, 60F = 313, 50F = 407.5, ** (end) = 460.5
                //-9.28*x + 873
                console.log('adc func ch0: ', dial)
                adc.channels[0] = dial;
                resolve(dial)
                // any other data processing code goes here...  
            })
        }
    });
}

adc.readch1 = () => {
    return new Promise(function (resolve) {
        if (!adc.busy) {
            adc.readADCSingleEnded(1, progGainAmp, samplesPerSecond, function (err, data) {
                if (err) {
                    //logging / troubleshooting code goes here...  
                    throw err;
                }
                // if you made it here, then the data object contains your reading! 
                var temp = data
                //Vin--R1--Vout--R2--Gnd
                //Vout = Vin*(R2/(R2+R1))
                //Vout(R2+R1)/Vin=R2
                //Vout*R1/Vin = R2 - Vout*R2/Vin
                //R1 = (Vin*R2)/Vout - R2
                //resistor = 8.19 kohm
                console.log('adc func ch1: ', temp)
                adc.channels[1] = temp;
                resolve(temp)
                // any other data processing code goes here...  
            })
        }
    });
}



// adc.read = (channel) => new Promise(function (resolve) {
//     console.log(readAsync(channel))
//     return resolve("readAsync(channel)")
// });

module.exports = adc;
