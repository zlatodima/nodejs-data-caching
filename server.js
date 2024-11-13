const { createServer } = require('node:http');
const dotenv = require('dotenv');
dotenv.config({
    path: './envs/.env'
});
console.log(process.env)
const DBConnection = require('./DBConnection');
const RedisConnection = require('./RedisConnection');
const {FilmService} = require("./services/filmService");
const url = require('url');
const NodeCache = require("node-cache");

const port = process.env.PORT;

const nodeCache = new NodeCache({
    stdTTL: 15
});

const server = createServer(async (req, res) => {
    await DBConnection.tryToConnect();
    await RedisConnection.tryToConnect();

    let parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    if (pathname === '/film') {
        let query = parsedUrl.query;
        let title = query.title;

        if (Array.isArray(title)) {
            title = title[0];
        }

        if (title) {
            if (nodeCache.has(title)) {
                let cacheValue = nodeCache.get(title);

                res.write(cacheValue);
                res.end();
                return;
            }

            if (await RedisConnection.redisClient.exists(title)) {
                let cacheValue = await RedisConnection.redisClient.get(title);

                res.write(JSON.parse(cacheValue));
                res.end();
                return;
            }

            let film = await FilmService.getFilmByName(title);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(film));
            res.end();

            await RedisConnection.redisClient.set(title, JSON.stringify(film));
            await RedisConnection.redisClient.expire(title, 30);
            return;
        }

        res.statusCode = 400;
        res.write('Not specified query params to filter film data.');
        res.end();
        return;
    }

    res.statusCode = 404;
    res.write('Not found resource.');
    res.end();
});
server.listen(port, () => {
    console.log(`Server running at ${port} port`);
});