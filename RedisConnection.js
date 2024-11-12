const { createClient } = require('redis');
const redisClient = createClient({
    host: process.env.POSTGRES_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

async function tryToConnect() {
    try {
        console.log(`redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`)
        await redisClient.connect();
        console.log('Redis: Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the redis:', error);
    }
}

module.exports = { tryToConnect, redisClient };