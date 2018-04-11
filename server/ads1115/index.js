const ads1x15 = require('node-ads1x15');
const chip = 1; //0 for ads1015, 1 for ads1115  

//Simple usage (default ADS address on pi 2b or 3):
//const adc = new ads1x15(chip, 0x48);

// Optionally i2c address as (chip, address) or (chip, address, i2c_dev)
// So to use  /dev/i2c-0 use the line below instead...:

const adc = new ads1x15(chip, 'dev/i2c-1');

//const channel = 0; //channel 0, 1, 2, or 3...  
const samplesPerSecond = '250'; // see index.js for allowed values for your chip  
const progGainAmp = '4096'; // see index.js for allowed values for your chip  

//somewhere to store our reading   
//var reading = 0;

adc.read = (channel) => {
    if (!adc.busy) {
        adc.readADCSingleEnded(channel, progGainAmp, samplesPerSecond, function (err, data) {
            if (err) {
                //logging / troubleshooting code goes here...  
                throw err;
            }
            // if you made it here, then the data object contains your reading!  
            return data;
            // any other data processing code goes here...  
        })
    }
}

console.log('ch0', adc.read(0))
module.exports = adc;
