const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'text/plain');
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log(`servidor rodando em http://localhost:3000/`);
});