const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path'); // Adicionado

// Carregamento do JSON
const animes = JSON.parse(fs.readFileSync('./animes.json'));
console.log(animes);

// Servir arquivos estáticos
app.use(express.static(__dirname));

app.get('/search', (req, res) => {
    const searchQuery = req.query.q ? req.query.q.toLowerCase() : '';
    const filteredAnimes = animes.filter(anime => 
        anime.nome.toLowerCase().includes(searchQuery) ||
        anime.descricao.toLowerCase().includes(searchQuery)
    );
    res.json(filteredAnimes);
});

// Rota para servir index.html corretamente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pesquisar.html'));
});

// Middleware para tratar rotas desconhecidas
app.use((req, res) => {
    res.status(404).send("Página não encontrada");
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
