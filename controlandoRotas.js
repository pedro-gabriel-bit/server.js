const http = require('http');

const sever = http.createServer((req,res)=>{
  if (req.url === "/") {
    res.end("Bem vindo a pagina inicial");
  } else if (req.url === "/sobre") {
    res.end("Bem vindo a pagina sobre");
  } else if (req.url === "/contato") {
    res.end("Bem vindo a pagina contato");
  } else {
    res.end("Pagina não encontrada");
  };
});
sever.listen(3000);