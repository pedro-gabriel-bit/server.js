// Importando o módulo HTTP o Node.js
// modulo nativo que permite criar servidores web
const http = require('http');

// Criando um servidor HTTP
// createServer: recebe uma funçao que sera executada toda vez que alguem acessar nosso servidor
const server = http.createServer((req,res)=>{
    // req: objeto que representa a requisição feita pelo cliente
    // res: objeto que representa a resposta que o servidor vai enviar para o cliente

    res.end('meu primeiro servidor'); // Enviando uma resposta para o navegador e finalizando a resposta
});

// faz o servidor escutar a porta 3000
server.listen(3000);
// Portas:
// 80: HTTP
// 442: HTTPS
// 3000: Porta comum para desenvolvimento (Node.js, React, etc)
// 8080: slternatica para web
// 5000: APIs