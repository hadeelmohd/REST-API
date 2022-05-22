const jwt = require("jwt-simple"); // the package that will help us -create- our jwts
const config = require("../config");

// const redisClient = require("../config/redis").getClient(); //importing redis client to cache me 
const User = require("../models/user");
const validationHandler = require("../validations/validationHandler");

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email}).select("+password");
        if (!user) {
            const error = new Error("wrong credentials");
            error.statusCode = 401;
            throw error;
        }

        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            const error = new Error("wrong credentials");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.encode({ id: user.id }, config.jwtSecret); //we're encoding the id with the jwt secret key
        return res.send({ user, token}); //return them back to the http req
    } catch (err) {
        next(err);
    }
}

exports.signup = async (req, res, next) => {
    try {
        validationHandler(req);
        const existingUser = await User.findOne({email: req.body.email});
        if (existingUser) {
            const error = new Error("Email already used");
            error.statusCode = 403;
            throw error;
        }
        let user = new User();
        user.email = req.body.email;
        user.password = await user.encryptPassword(req.body.password); // the pw inserted by the user but encrypted 
        user.name = req.body.name;
        user = await user.save(); 
        const token = jwt.encode({ id: user.id }, config.jwtSecret);
        return res.send({user, token});
    } catch (err) {
        next(err);
    }
};

exports.me = async (req, res, next) => {
    try {
        // const cacheValue = await redisClient.get("users", req.user.id);

        // if(cacheValue){
        //     console.log("getting data from redis cache");
        //     const doc = JSON.parse(cacheValue);
        //     const cacheUser = new User(doc);
        //     return res.send(cacheUser);
        // }

        // console.log("getting data from db");
       const user = await User.findById(req.user);
       //  redisClient.set("users", req.user.id, JSON.stringify()) //("hash key", key value, the object of users stringified  )
       return res.send(user);
    } catch (err) {
        next(err);
    }
};