const apikey = "b96c4268"
const getinput = document.getElementById("movie-name")
const movieform = document.getElementById("input")
const movies = document.getElementById("container")





movieform.addEventListener("submit", async (event) => {
    event.preventDefault();

    const movie = getinput.value.trim();

    if (!movie) {
        displayError("Please enter a movie name");
        return;
    }

    try {
        const moviedata = await movieDAta(movie);
        console.log(moviedata);
        displaymovieInfo(moviedata);
    } catch (error) {
        displayError(error.message);
    }
});

async function movieDAta(movieName) {
    const apiUrl = `https://www.omdbapi.com/?apikey=${apikey}&s=${movieName}`;
    
    const response = await fetch(apiUrl);
    const data =await response.json();
    
    if (data.Response === "False") {
        throw new Error("movie not found");
    }
    
    return data ;
    
}

function displaymovieInfo(data) {
    const container = document.getElementById("container");

    // clear old results
    container.innerHTML = "";

    data.Search.forEach(movie => {

        const { Title, Year, imdbID, Type, Poster } = movie;

        const movieCard = document.createElement("div");
        movieCard.className =
            "bg-gray-300 rounded-xl shadow-md overflow-hidden hover:scale-105 transition";

        movieCard.innerHTML = `
            <img 
                src="${Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x400"}" 
                class="w-full h-80 object-cover"
            >
            <div class="p-4">
                <h2 class="text-lg font-bold">${Title}</h2>
                <p class="text-gray-600 text-sm">${Year} • ${Type}</p>
                <a 
                  href="https://www.imdb.com/title/${imdbID}" 
                  target="_blank"
                  class="block mt-3 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View on IMDb
                </a>
            </div>
        `;

        container.appendChild(movieCard);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    movieDAta("batman")
        .then(displaymovieInfo)
        .catch(err => displayError(err.message));
});
