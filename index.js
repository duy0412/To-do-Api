const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./database_connection.js');
const initRoutes = require('./src/routes/index.js');


const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    method: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
initRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SERVER is running on the port " + PORT))


