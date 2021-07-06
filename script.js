const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w1280';

const mainElm = document.querySelector('main');

// 映画情報を取得
async function getMovies() {
  const resp = await fetch(API_URL);
  const respData = await resp.json();

  console.log(respData);

  // オブジェクトを1つずつ取り出す
  // img要素を作成
  // img pathを結合
  // bodyに追加
  respData.results.forEach(movie => {
    console.log(movie);

    const movieElm = document.createElement('div');
    movieElm.classList.add('movie');
    movieElm.innerHTML = `
      <img src="${IMAGE_URL + movie.poster_path}" alt="" />

      <div class="movie-info">
        <h3>${movie.title}</h3>
        <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
      </div>
    `;
    mainElm.appendChild(movieElm);
  });
  

  return respData;
}

function getClassByRate(vote) {
  if(vote >= 8) {
    return 'green';
  } else if (vote > 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

getMovies();