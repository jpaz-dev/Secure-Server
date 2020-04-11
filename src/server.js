//Imports
const bodyParser = require('body-parser');
const session = require('cookie-session');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const https = require('https');
const cors = require('cors');
const ip = require('ip');
const fs = require('fs');

//Creating secure server
const app = express();
const PORT = 8080;
const KEY = fs.readFileSync('./key.pem');
const CERT = fs.readFileSync('./cert.pem');
const server = https.createServer({ key: KEY, cert: CERT }, app);

//Config Server
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(helmet({ dnsPrefetchControl: { allow: true } }));
app.use(session({
    name: 'Finn',
    keys: ['Adventure Time', 'T1000', 'T800'],
    cookie: {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000)
    }
}))

//Endpoints
app.get("/", (req, res) => {
    res.redirect("/index.html")
})

app.get("*", (req, res) => {
    res.status(404).send('No se encontro el recurso solicitado :C');
})

//Launch Server
server.listen(PORT, () => {
    console.log(`Listen on port: ${PORT}\nURL: https://${ip.address()}:${PORT}/`);
})