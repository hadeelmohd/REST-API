module.exports = {
    jwtSecret: process.env.jwtSecret, //enviroment variables
    mongoURI: process.env.mongoURI,
    redisHOST: process.env.redisHOST,
    redisPORT: process.env.redisPORT,
    redisPassword: process.env.redisPassword,
    port: process.env.port
};