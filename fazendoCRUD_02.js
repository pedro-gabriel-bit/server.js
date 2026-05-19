// Importando o módulo nativo HTTP do Node.js
const http = require('http');
 
// Simulação de um "banco de dados" em memória usando um array de objetos
let livros = [
    {
        id: 1,
        titulo: 'O pequeno Principe',
        autor: 'Antonie de Saint-Exupéry'
    }
];
 
// Criação do Servidor HTTP
const server = http.createServer((req, res) => {

    // Captura o método da requisição (GET, POST, PUT ou DELETE)
    const metodo = req.method;

    // Captura a URL da requisição (/livros)
    const url = req.url

    // Define que a resposta será em JSON
    res.setHeader('Content-Type', 'application/JSON');
 
    // Construindo o método GET - Listar livros
    if (url === '/livros' && metodo === 'GET') {

        res.statusCode = 200; // sucesso

        // Retornará a lista de livros em formato JSON
        res.end(JSON.stringify(livros));

        return; // encerra a execução dessa requisição.
    };
 
    // Construindo o método POST - Cadastrar livro
    if (url === '/livros' && metodo === 'POST') {

        // Variável para armazenar os dados enviados no body
        let body = '';

        // Evento disparado quando chegam pedaços da requisição
        req.on('data', parte => {

            body += parte; // concatena os pedaços
        });

        // Evento a ser disparado depois que todos os dados chegam
        req.on('end', () => {

            // Converte o JSON recebido em objeto JavaScript
            const novoLivro = JSON.parse(body);

            // Adiciona o novo livro ao array de livros
            livros.push(novoLivro);

            res.statusCode = 201; // Criado com sucesso
 
            res.end(JSON.stringify({
                mensagem: 'Livro criado com sucesso',
                livro: novoLivro
            }));
        });
        return; // encerra a requisição
    };
 
    // Construindo o método PUT - Atualizar livro
    if(url === '/livros' && metodo === 'PUT') {
        // Variável para armazenar os dados enviados no body
        let body = '';
        // Evento disparado quando chegam pedaços da requisição
        req.on('data', parte => {
            body += parte; // concatena os pedaços
        });

        req.on('end', () => {
            // Recebe todos os dados atualizados vindos do cliente

            const livroAtualizado = JSON.parse(body);
            // Percorre a lista de livros (array) e substitui o livro com ID igual
            livros = livros.map(livro => {
                // Se encontrar o mesmo ID, substitui
                if(livro.id === livroAtualizado.id) {
                    return livroAtualizado;
                };
                // Devolve todas as atualizações e o que não mudar, retorna igual.
                return livro;
            });
            res.statusCode = 200; // sucesso
            res.end(JSON.stringify({
                mensagem: 'Livro atualizado com sucesso',
                livros: livros
            }));
        });
        return;
    };
 
    // Construindo o método DELETE - remover livro
    if(url === "/livros" && metodo === "DELETE") {
        let body = '';
 
        req.on('data', parte => {
            body += parte;
        });
 
        req.on('end', () => {
            // Recebe o ID do livro a ser removido
            const dados = JSON.parse(body);
 
            // Filtra o array, removendo o livro com o ID informado.
            // dessa forma, o array de livros será mantido apenas com os objetos cujo ID é diferente do removido.
            livros = livros.filter(livro => livro.id !== dados.id);
 
            res.statusCode = 200; // sucesso
 
            res.end(JSON.stringify({
                mensagem: 'Livro removido com sucesso!',
                livros: livros
            }));
        });
        return;
    }
    // Rota não encontrada
    res.statusCode = 404; // Não encontrado

    // Convertendo a resposta em JSON e exibindo a mensagem
    res.end(JSON.stringify({
        mensagem: 'Rota não encontrada'
    }));
});
server.listen(3000, () => {
    console.log('Server running in http://localhost:3000');
});
 