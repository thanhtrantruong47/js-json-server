const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const fs = require("fs");
const path = require("path");

// Sửa đường dẫn của file db.json
const filePath = path.join(__dirname, "db.json");

// Đọc dữ liệu từ file db.json
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);

const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();
const port = 3001;

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1'
}));
server.use(router);

server.listen(port, () => {
    console.log('JSON Server is running on port: ', port);
});

module.exports = server;
