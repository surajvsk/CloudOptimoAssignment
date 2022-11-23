let redis = require("redis")

class RedisClient {
    // _client

    // get client() {
    //     if (!this._client) {
    //         throw new Error('Cannot access REDIS Client before connecting')
    //     }
    //     return this._client
    // }


 

    // connect(REDIS_PORT, REDIS_HOST, REDIS_PASS) {
    //     this._client = redis.createClient(
    //         REDIS_PORT,
    //         REDIS_HOST
    //     )

    //     return new Promise((resolve, reject) => {
    //         this._client.AUTH(REDIS_PASS, async function (err, result) {
    //             if (err) {
    //                 console.log('err::::::::::',err)
    //                 reject(err)
    //             }else{
    //                 console.log('Connected to REDIS',result);
    //                 resolve();
    //             }
    //         });
    //     })
    // }
}

exports.redisClient = new RedisClient()








