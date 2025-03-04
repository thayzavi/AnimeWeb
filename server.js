const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const app = express();
const port = 4001;

app.use(cors());
app.use(express.static(path.join(__dirname)));


// Carregamento do JSON
app.get('/search', (req, res) => {
    try {
        // Ler o arquivo JSON
        const animes = JSON.parse(fs.readFileSync('./animes.json', 'utf-8'));
        const searchQuery = req.query.q ? req.query.q.toLowerCase() : '';
 
        // Filtrar os animes pelo nome ou descrição
        const filteredAnimes = animes.filter(anime =>
            anime.nome.toLowerCase().includes(searchQuery) ||
            anime.descricao.toLowerCase().includes(searchQuery)
        );
 
        res.json(filteredAnimes);
    } catch (error) {
        console.error("Erro ao ler JSON:", error);
        res.status(500).json({ error: "Erro no servidor" });
    }
});

// Rotas para cada página HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/pesquisar', (req, res) => {
    res.sendFile(path.join(__dirname, 'pesquisar.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'cadastro.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});