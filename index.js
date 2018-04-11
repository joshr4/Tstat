const app = require('./server/')
const PORT = 8080 //|| process.env.PORT;

console.log('TESTING')

app.listen(PORT, () => console.log(`Change the temp on port ${PORT}`));
