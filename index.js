require('dotenv').config();
const app = require('./server');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`BOGA! Server is running! ${port}`);
});