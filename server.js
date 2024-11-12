const { createServer } = require('node:http');
const dotenv = require('dotenv');
dotenv.config({
    path: './envs/.env'
});

const { tryToConnect } = require('./DBConnection');
const {FilmService} = require("./services/filmService");
const url = require('url');


const port = process.env.PORT;

const server = createServer(async (req, res) => {
    await tryToConnect();

    let parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;

    if (pathname === '/film') {
        let query = parsedUrl.query;
        let title = query.title;

        if (Array.isArray(title)) {
            title = title[0];
        }

        if (title) {
            let films = await FilmService.getFilmByName(title);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(films));
            res.end();
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