const express = require('express');
const serverConfig = require("./config/serverConfig");
const connectDB = require('./config/dbConfig');
//const bodyParser = require('body-parser')

const app = express();

//app.use(bodyParser.json()); //privious use this method
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({ message: "pong" });
})

app.listen(serverConfig.PORT, async () => {
    await connectDB();
    console.log(`Server started at port: ${serverConfig.PORT}`);
})

