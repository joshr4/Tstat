const app = require('./server')
const PORT = 8080 //|| process.env.PORT;

app.listen(PORT, () => console.log(`Change the temp on port ${PORT}`));