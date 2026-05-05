const http = require('http');
const port = 3000;
const hostname = '127.0.0.1';
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log(`Requisição tipo de metodo: ${req.method}`);
  if (req.url === "/") {
    res.end('Servidor rodando');
  } else if (req.url === "/sobre") {
    res.end("Bem vindo a pagina sobre");
  } else if (req.url === "/contato") {
    res.end("Bem vindo a pagina contato");
  } else if (req.url === "/produtos") {
    res.end("Bem vindo a pagina produtos");
  } else {
    res.end("Pagina não encontrada");
  } 
});
server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

