const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query='

const mainElm = document.getElementById('main');
const formElm = document.getElementById('form');
const searchElm = document.getElementById('search');

getMovies(API_URL);

// 映画情報を取得
async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  showMovies(respData.results);

  // console.log(respData.results);
}

// 映画情報を表示
function showMovies(movies) {

  // 前回の表示をクリア
  mainElm.innerHTML = '';

  movies.forEach(movie => {
    const { poster_path, title, vote_average } = movie;

    const movieElm = document.createElement('div');
    movieElm.classList.add('movie');
    movieElm.innerHTML = `
      <img 
        src="${poster_path ? IMAGE_URL + poster_path : 'noimage.png'}" 
        alt="${title}" 
      />

      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">
          ${vote_average}
        </span>
      </div>
    `;

    mainElm.appendChild(movieElm);
  });  
}

// レーティングによってclassを付与
function getClassByRate(vote) {
  if(vote >= 8) {
    return 'green';
  } else if (vote > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

formElm.addEventListener('submit', event => {
  event.preventDefault();

  const searchTerm = searchElm.value;
  if(searchTerm) {
    getMovies(SEARCH_URL + searchTerm);
    searchElm.value = '';
  }
});