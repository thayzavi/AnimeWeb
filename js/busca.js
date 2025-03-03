document.getElementById('search-input').addEventListener('input', function(){
    const query = this.Value;

    fetch(`/search?q=${query}`)
    .then(response => response.json())
    .then(data => {
        const animeList = document.getElementById('animeList');
        animeList.innerHTML = '';
        data.forEach(anime => {
            const animeElement = document.createElement('div');
            animeElement.innerHTML = `<h3> ${anime.nome}</h3>
            <p>${anime.descricao}</p>
            <img src="${anime.imagem}" alt="${anime.nome}">`;
            animeList.appendChild(animeElement);
        });
    });
});