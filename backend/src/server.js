const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');

if (process.env.ENV_APP_APPINSIGHTS != null)
    appInsights.setup(process.env.ENV_APP_APPINSIGHTS).start();

var app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

const port = process.env.PORT || 3335;

app.listen(port);

module.exports = app;