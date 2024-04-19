// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const filePath = path.join(__dirname, '../db.json');
// const data = fs.readFileSync(__dirname, '../db.json', "utf-8");
// const router = jsonServer.router(data)
// const middlewares = jsonServer.defaults()

// server.use(middlewares)
// // Add this before server.use(router)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/product/:resource/:id/show': '/:resource/:id'
// }))
// server.use(router)
// server.listen(3000, () => {
//     console.log('JSON Server is running')
// })

// // Export the Server API
// module.exports = server

const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();

// allow write operations
const fs = require("fs");
const path = require("path");
// const filePath = path.join(__dirname + "db.json")
const data = fs.readFileSync(__dirname + "../db.json", "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3001; // you can use any port number here; i chose to use 3001

server.use(middlewares);
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}))
server.use(router);

server.listen(3001, () => {
    // console.log('JSON Server is running on port: ', 3);
});

module.exports = server;