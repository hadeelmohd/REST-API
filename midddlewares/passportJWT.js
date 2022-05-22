const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/user");
const config = require("../config");

const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy; // predefined strategy to authenticate our ps
const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = () => { // a new strategy we defined 
    const strategy = new Strategy(params, async ( payload, done) => {
        const user = await User.findById(payload.id); // payload is a part of the jwt 
        if (!user) return done(new Error("user not found"), null);
        return done(null, user); //callback
    });


passport.use(strategy);

return {
    initialize: function() {
        return passport.initialize();
    },
    authenticate: function() {
        return passport.authenticate("jwt", { session: false});
    }

};
};