const serveurConfig = require("./config/server");

const express = require('express');
const database = require('./models/index');
const router = require('./api-routes/router');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//Load MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(cors);

database.sequelize.sync({ force: true });

//Load Routes
router(app);

app.listen(serveurConfig.PORT, ()=>{
  console.log("Serveur is running on : "+ serveurConfig.PORT );
})

module.exports = app;
