const util = require("util");
const redis = require("redis");

const config = require("../config/index");

let client;

module.exports = {
    getClient: () => {
        if (!client) { //if there is no client then we are creating one 
            console.log("reinitializing REDIS...!!!");
            console.log(`node-redis version is ${require('redis/package.json').version}`);
            redisConfig = { //clients configuration first 
                host: config.redisHOST,
                port: config.redisPORT
            };
            if (process.env.NODE_ENV === "production") {
                redisConfig.password = config.redisPassword;
            }
            client = redis.createClient(redisConfig); //client creation 
            client.get = util.promisify(client.get);
        }
        return client;
    }
};
//then go to /config/index and specify the host and port 