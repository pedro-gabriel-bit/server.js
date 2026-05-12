// Importando o módulo nativo HTTP do Node.js para criar um servidor web
const http = require('http');

let livros = [
  {
    id: 1,
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    ano: 1954
  },

  {
    id: 2,
    titulo: "Harry Potter e a Pedra Filosofal",
    autor: "J.K. Rowling",
    ano: 1997
  },

  {
    id: 3,
    titulo: "O pequeno príncipe",
    autor: "Antoine de Saint-Exupéry",
    ano: 1943
  }
];

// Criaçao do servidor HTTP
const server = http.createServer((req, res)=>{

  // Captura do metodo da requisição HTTP (GET, POST, PUT, DELETE)
  const metodo = req.method

// Captura da URL da requisição (/livros)
  const url = req.url

  // definindo o tipo de conteúdo da resposta como JSON
  res.setHeader('content-type', 'application/JSON');

  // Contruindo o metodo GET para a rota /livros
  if (url === "/livros" && metodo === "GET") {

    res.statusCode = 200; // Status de sucesso
    res.end(JSON.stringify(livros));// Envia a lista de livros como resposta
    return; // Encerra a execução da função para evitar que o código continue
  };

  // Contruindo o metodo POST - para criar um novo livro
  if (url === "/livros" && metodo === "POST") {
    // variavel para armazenar os dados enviados no body da requisição
    let body = '';

    // evento disparando quando chegam pertes de dados no body da requisição
    res.on('data', parte => {
      body += parte; // Acumula as partes do body
    });

    // evento a ser disparado depois que todos os dados chegam 
    req.on('end', () => {
      const novoLivro = JSON.parse(body);// Converte o JSON recebido em um objeto JavaScript
      livros.push(novoLivro); // Adiciona o novo livro à lista de livros

      res.statusCode = 201; // criado com sucesso

      res.end(JSON.stringify({
        mensagem: "Livro criado com sucesso",
        livro: novoLivro
      })); // Envia o novo livro criado como resposta
    });
    return; // Encerra a execução da função para evitar que o código continue
  };

  // Contruindo o metodo PUT - para atualizar um livro existente
  if (url.startsWith("/livros/") && metodo === "PUT") {
    // variavel para armazenar os dados enviados no body da requisição
    let body = '';

    // evento disparando quando chegam pertes de dados no body da requisição
    res.on('data', parte => {
      body += parte; // Acumula as partes do body
    });

    req.on('end', () => {
      // recebe todos os dados atualizados do cliente
      const livroAtualizado = JSON.parse(body);
      // percorre a lista de livros (array) e substitui o livro antigo pelo livro atualizado
      livros = livros.map(livro => {
        // Verifica se o ID do livro atual é igual ao ID do livro atualizado
        if (livro.id === livroAtualizado.id) {
          return livroAtualizado; // Retorna o livro atualizado
        };
        return livro; // Retorna o livro original
      });
      res.statusCode = 200; // Sucesso
      res.end(JSON.stringify({
        mensagem: "Livro atualizado com sucesso",
        livros: livros
      }));
    });
  };

  // Rota nao encontrada
  res.statusCode = 404; // Status de recurso nao encontrado

  res.end(JSON.stringify({mensagem: "Recurso não encontrado"})); // Envia uma mensagem de erro como resposta
});

server.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000/`);
});