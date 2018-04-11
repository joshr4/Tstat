const ads1x15 = require('node-ads1x15');
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
let ch0 = 0;
let ch1 = 0;

adc.read = () => {
    if (!adc.busy) {
        adc.readADCSingleEnded(0, progGainAmp, samplesPerSecond, function (err, data) {
            if (err) {
                //logging / troubleshooting code goes here...  
                throw err;
            }
            // if you made it here, then the data object contains your reading! 
            console.log('ch0 ', data)
            ch0 = data;
            // any other data processing code goes here...  
        })
        adc.readADCSingleEnded(1, progGainAmp, samplesPerSecond, function (err, data) {
            if (err) {
                //logging / troubleshooting code goes here...  
                throw err;
            }
            // if you made it here, then the data object contains your reading! 
            console.log('ch1 ', data)
            ch1 = data;
            // any other data processing code goes here...  
        })
    }
}

module.exports = { adc, ch0, ch1 };
