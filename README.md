This is a network thermostat built with a Raspberry pi and an ADS1115 analog digital converter.

The ADC samples the resistances of the setpoint slider potentiometer and thermostat thermistor in order to determine their position and temperature, respectively.

The Rpi then triggers a relay via a GPIO pin to turn an external heat source on or off.

Future versions are planned to support a desktop browser and mobile app client interface in order to interact with the thermostat and edit occupancy schedules/setpoints.