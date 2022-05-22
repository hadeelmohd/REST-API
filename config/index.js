// module.exports = {
//     jwtSecret: "hwe730ksny369jbhsrrlmagfrri9m", //random string i invented
//     redisHOST: "127.0.0.1",
//     redisPORT: "6379",
// };

if (process.env.NODE_ENV === "production") {
    module.exports = require("./prod");
} else {
    module.exports = require("./dev");
}