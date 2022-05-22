const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimiter = require("express-rate-limit");
const mongoose = require('mongoose');

const config = require("./config")

const passportJWT = require("./midddlewares/passportJWT")();//bc its a function and we need to call it 
const errorHandler = require('./midddlewares/errorHandler');
const postRoute = require('./routes/post');
const authRoute = require('./routes/auth');
const followRoute = require('./routes/follow');
const app = express();

app.use(cors());

app.enable("trust proxy");

const limiter = rateLimiter({
    windowMs: 10 * 1000, //15 seconds
    max: 5 //limit each IP to 10 requests per windowMs 
});

app.use(limiter);
//apply to all requests 

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, { useNewUrlParser: true });
// url is a syntax mongodb://localhost/{project name}



app.use(bodyParser.json());
//to make them available inside our app 
app.use(express.static(path.join(__dirname, "public")));
//all the above is default express code i need t get used to it 
app.use(passportJWT.initialize());

app.use("/api/post", passportJWT.authenticate(), postRoute); //post managed by postRoutes app.use("path",managed by)
app.use("/api/auth", authRoute);
app.use("/api/follow", passportJWT.authenticate(), followRoute); // we need the authentication middleware so only signed up users can follow another users 
app.use(errorHandler);

app.listen(config.port, () => {
    console.log("Listening");
})