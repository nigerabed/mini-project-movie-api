async function searchMovie(movieName, page = 1) {
  let url = `http://www.omdbapi.com/?s=${movieName}&page=${page}&apikey=729537f1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);

    const movieConatiner = document.getElementById("movieConatiner");
    movieConatiner.innerHTML = "";

    if (data.Response === "True") {
      const movieData = data.Search.slice(0, 5);
      movieData.forEach((movie) => {
        movieConatiner.innerHTML += `
                     <div class="movie">
                       <img src=${
                         movie.Poster !== "N/A"
                           ? movie.Poster
                           : "./placeholder.jpg"
                       }>
                       <div>
                         <h3>${movie.Title}</h3>
                         <p>${movie.Year}</p>
                      </div>
                     `;
      });
    } else {
      movieConatiner.innerHTML = "<p>No moview found</p>";
    }
  } catch (error) {
    console.log(error);
  }
}

function handleSearch() {
  const moviewName = document.getElementById("movieInput").value;
  if (moviewName) {
    currentSearch = moviewName;
    currentPage = 1;
    searchMovie(currentSearch, currentPage);
  }
}

let currentPage = 1;
let currentSearch = "";

function nextPage() {
  if (currentSearch !== "") {
    currentPage++;
    searchMovie(currentSearch, currentPage);
  }
}
function prevPage() {
  if (currentSearch !== "" && currentPage > 1) {
    currentPage--;
    searchMovie(currentSearch, currentPage);
  }
}
