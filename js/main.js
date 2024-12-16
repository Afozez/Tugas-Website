// Start header javascript

// Memangil elemen mengunakan id 
const dropdownList = document.getElementById('dropdown-list')
const toggle = document.getElementById('toggle')

// Membuat event pada id toggle
// ketika toogle di hover maka elemen dengan id dropDownList di ubah style menjadi block
toggle.addEventListener('click', (event) => {
    event.stopPropagation();

    dropdownList.style.display === 'block' ? dropdownList.style.display = 'none' : dropdownList.style.display = 'block'
})

document.body.addEventListener('click', () => {
    dropdownList.style.display = 'none'
})

// End header javascript

// Start main javascript

// Kunci untuk mengakses API
const API_KEY = '8b851bc1f4287fd5a1bbeaaf4895a991'

// Default halaman
let page = 1

// URL untuk mengambil data anime dari Jikan API
const BASE_URL = () =>`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w200";
const TOP_RATED_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getMoviesTopRated(topRatedUrl) {
    const response = await fetch(topRatedUrl);
    const movieDataTopRated = await response.json();
    const minmalCard = movieDataTopRated.results.slice(0, 5)
    showTopMovieRated(minmalCard)
}

async function getMovies(baseUrl) {
    const response = await fetch(baseUrl);
    const movieData = await response.json();
    showMovies(movieData.results)
}

function showTopMovieRated(moviesTopRated) {
    const listTopRated = document.getElementById('listTopRated')

    moviesTopRated.forEach((movie, index) => {
        const {title, poster_path, vote_average} = movie
        const cardMovieTopRated = `
            <div class="ranking-card">
                <h5>${index + 1}</h5>
                <img src="${IMAGE_URL + poster_path}" alt="">
                <div class="title-rating">
                    <p>${title}</p>
                    <i>vote: ${vote_average}</i>
                </div>
            </div>
        `
        listTopRated.innerHTML += cardMovieTopRated
    });
}


function showMovies(movies) {
    const containerCard = document.getElementById('containerCard')
 
    containerCard.innerHTML = ''
    movies.forEach(movie => {
        const {title, poster_path} = movie
        const truncatedTitle = title.length > 36 ? title.substring(0, 36) + '...' : title;
        const cardMovie = `
            <div class="card-movie">
                <div class="card-image">
                    <img src="${IMAGE_URL + poster_path}" alt=""/>
                </div>
                <p>${truncatedTitle}</p>
            </div>
        `
        containerCard.innerHTML += cardMovie
    });

}

const next = document.getElementById('next')
const prev = document.getElementById('prev')
const formSearch = document.getElementById('formSearch')

function updatePage() {
    getMovies(BASE_URL())
    const pageText = document.getElementById('pageText')
    pageText.textContent = "halaman " + page
}


next.addEventListener('click', () => {
    if(page < 18) {
        page++
        updatePage()
    }
})

prev.addEventListener('click', () => {
    if(page > 1) {
        page--
        updatePage()
    }
})

formSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputByUser = document.getElementById('inputByUser')

    if(inputByUser.value !== '') {
        getMovies(SEARCH_URL + inputByUser.value)
    }
})



updatePage()
getMoviesTopRated(TOP_RATED_URL)