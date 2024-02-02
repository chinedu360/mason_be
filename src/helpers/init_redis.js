const redis = require("redis");

// Create the Redis client using environment variables
const redisClient = redis.createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
});

async function start(redisClient) {
  // await client.set('mykey', 'Hello from node redis');
  // const myKeyValue = await client.get('mykey');
  // console.log(myKeyValue);
  await redisClient.connect();
}

start(redisClient);

redisClient.on("connect", () => {
  // console.log('Connected to Redis12345');
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("error", (err) => {
  console.log(err.message);
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

module.exports = redisClient;

// const redis = require('redis');

// // const redisClient = redis.createClient()

// // const redis = require('redis');

// const redisClient = redis.createClient(6379,'127.0.0.1');

// async function start(redisClient) {
//     // await client.set('mykey', 'Hello from node redis');
//     // const myKeyValue = await client.get('mykey');
//     // console.log(myKeyValue);
//     await redisClient.connect();
// }

// start(redisClient);

// // let redisClient = redis.createClient({
// //     port      : 6379,
// //     host      : 'redis'
// // });

// // redisClient.connect().then(() => {
// //     console.log('Connected to Redis');
// // }).catch((err) => {
// //     console.log(err.message);
// // })

// redisClient.on('connect', () => {
//     // console.log('Connected to Redis12345');
// })

// redisClient.on('ready', () => {
//     console.log('Redis is ready');
// })

// redisClient.on('error', (err) => {
//     console.log(err.message);
// })

// redisClient.on('end', () => {
//     console.log('Redis connection ended');
// })

// process.on('SIGINT', () => {
//     redisClient.quit();
// })

// module.exports = redisClient;
