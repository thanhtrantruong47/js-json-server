const fs = require("fs");
const path = require("path");
const jsonServer = require('json-server');

// Path to db.json file outside the api directory
const dbFilePath = path.join(__dirname, '..', 'db.json'); 

// Read and parse the contents of db.json
const db = JSON.parse(fs.readFileSync(dbFilePath));

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));
server.use(router);

server.listen(8080, () => {
    console.log('JSON Server is running');
});

module.exports = server;
