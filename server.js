const express  = require('express');
require('dotenv').config();
const connectDb = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')

connectDb();

const app = express();
app.use(express.json());
app.use(cors());

const port = parseInt(process.env.PORT) || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to Spider Track - Assignment by Kaji RK...!');
});

app.use('/api/customers', require("./routes/customerRoutes"))

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Node API App is running on port:${port}!`);
});