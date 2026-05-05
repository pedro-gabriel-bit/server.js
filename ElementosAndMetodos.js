const http = require('http');

const seraver = http.createServer((req, res) => {
  console.log(req.method); // Imprime o método HTTP da requisição (GET, POST, etc)
  res.writeHead(200, { 'Content-Type': 'text/plain' }); // Writable: Define o status da resposta e os headersgit branch -M main
  res.end(`Metodo recebido: ${req.method}`);
});

seraver.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
  console.log('http://localhost:3000');
});