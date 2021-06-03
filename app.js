const serveurConfig = require("./config/server");
const passport = require("./middleware/auth/auth.middleware");
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
app.use(passport.initialize());

app.listen(serveurConfig.PORT, ()=>{
  console.log("Serveur is running on : "+ serveurConfig.PORT );
})

module.exports = app;
