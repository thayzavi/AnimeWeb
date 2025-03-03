const express = require('express');
const app = express();
const port = 4001;
const fs = require('fs');
const path = require('path'); // Adicionado

// Carregamento do JSON
app.get('/search', (req, res) => {
    const animes = JSON.parse(fs.readFileSync('./animes.json')); // Lendo os dados do JSON
    const searchQuery = req.query.q ? req.query.q.toLowerCase() : '';

    // Filtrando animes pelo nome ou descrição
    const filteredAnimes = animes.filter(anime => 
        anime.nome.toLowerCase().includes(searchQuery) ||
        anime.descricao.toLowerCase().includes(searchQuery)
    );

    res.json(filteredAnimes);
});

// Rota para servir pesquisar.html corretamente
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