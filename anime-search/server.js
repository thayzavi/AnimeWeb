const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// carregamento do json
const animes = JSON.parse(fs.readFileSync('./animes.json'));

app.get('/search', (req, res) => {
    const searchQuery = req.query.q ? req.query.q.toLowerCase():'';
    const filteredAnimes = animes.filter(anime => anime.nome.toLowerCase().includes(searchQuery)
|| anime.descricao.toLowerCase().includes(searchQuery));
    res.json(filteredAnimes);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pesquisar.html');
  });

// iniciar sevi

app.listen(port,() => {
    console.log(`Servido rodadndo na porta ${port}`);
});
  
