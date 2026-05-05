// Importando apaenas a função createServer do módulo HTTP
// http do node.js
const { createServer } = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000; // Porta 3000

// Criando o servidor
const server = createServer((req, res) => {
  res.statusCode = 200; // Status de sucesso
  res.setHeader('content-type', 'text/plain'); // Definindo o tipo de conteúdo da resposta

  res.end('servidor rodando'); // Enviando a resposta para o cliente e finalizando a resposta

});

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}/`); // Log para indicar que o servidor está rodando
});