const redis = require('redis');
const { redisAddress, redisPort } = require('../../config/redis');

const client = redis.createClient({
    url: `redis://${redisAddress}:${redisPort}`,
    password: process.env.REDIS_PASSWORD
});

client.on('error', (err) => console.error('Redis Client Error', err));
client.on('connect', () => console.log('Connected to redis'));

client.connect();

module.exports = client;
