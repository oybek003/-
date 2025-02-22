import movies from "./movies.js";

const pokemonContainer = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const filterType = document.getElementById("filterType");
const sortBy = document.getElementById("sortBy");
const searchButton = document.getElementById("searchButton");

function generator(pokemons) {
    pokemonContainer.innerHTML = "";

    pokemons.forEach(pokemon => {
        const card = document.createElement("div");
        card.classList.add("card");

        let Title = pokemon.Title;
        let type = pokemon.movie_year;
        let weight = pokemon.imdb_rating;
        let Categories = pokemon.Categories;

        card.innerHTML = `
            <h3>${Title}</h3>
            <img src="https://io.gidonline.fun/img/9e7c36e28_200x300.jpg" alt="">
            <p>Год: ${type}</p>
            <p>Рейтинг: ${weight}</p>
            <p>Категории: ${Categories}</p>
        `;
        pokemonContainer.appendChild(card);
    });
}

function filter() {
    let filteredPokemons = [...movies];

    if (sortBy.value === "alphabeticalAsc") {
        filteredPokemons.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortBy.value === "alphabeticalDesc") {
        filteredPokemons.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (sortBy.value === "CategoriesAsc") {
        filteredPokemons.sort((a, b) => a.Categories.localeCompare(b.Categories));
    } else if (sortBy.value === "CategoriesDesc") {
        filteredPokemons.sort((a, b) => b.Categories.localeCompare(a.Categories));
    } else if (sortBy.value === "YearsAsc") {
        filteredPokemons.sort((a, b) => a.movie_year - b.movie_year);
    } else if (sortBy.value === "YearsDesc") {
        filteredPokemons.sort((a, b) => b.movie_year - a.movie_year);
    }

    generator(filteredPokemons);
}

searchButton.addEventListener("click", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredPokemons = movies.filter(pokemon =>
        pokemon.Title.toLowerCase().includes(searchValue)
    );
    generator(filteredPokemons);
});

function filterByType() {
    const selectType = filterType.value.toLowerCase();
    let filteredPokemons;

    if (selectType === "all") {
        filteredPokemons = movies;
    } else {
        filteredPokemons = movies.filter(pokemon => 
            pokemon.Categories.toLowerCase().includes(selectType)
        );
    }

    generator(filteredPokemons);
}

generator(movies);

filterType.addEventListener("change", filterByType);
sortBy.addEventListener("change", filter);