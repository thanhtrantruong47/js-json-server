const fs = require("fs");
const path = require("path");
const jsonServer = require('json-server');

// Đường dẫn đến tệp db.json bên ngoài thư mục api
const dbFilePath = path.join(__dirname, '..', 'db.json'); 

// Đọc dữ liệu từ tệp db.json
const dbData = fs.readFileSync(dbFilePath, 'utf8');
const db = JSON.parse(dbData);

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}));
server.use(router);

// Ghi dữ liệu vào tệp db.json sau mỗi thay đổi
router.db._.write();

server.listen(8080, () => {
    console.log('JSON Server is running');
});

module.exports = server;
