import {
  makeData,
  createCard,
  dataMostPopularNormalize,
  arrLastData,
} from './apiNews';
import { mostPopularNews, perPage } from './apiUrl';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { saveLS, loadLS, removeLS } from './lStorage';
import { checkFavorites } from './apiCard';
const LS_KEY = 'lastSearch';
const FAIVORIT_NEWS = 'favoritNews';
const gallery = document.querySelector('.gallery');

const weather = document.querySelector('.weather__thumb');
const sectionHome = document.querySelector('.section_home');
const errorRequest = document.querySelector('.errorRequest');

async function makeMostPopularNews(url) {
  arrLastData.length = 0;

  try {
    const news = await makeData(url);
    //console.log(news)
    arrLastData.push(...news.map(dataMostPopularNormalize));
    gallery.innerHTML = arrLastData.map(createCard).join('');
    gallery.prepend(weather);
    errorRequest.classList.add('visually-hidden');
    sectionHome.classList.remove('visually-hidden');

    checkFavorites(FAIVORIT_NEWS);
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', () => {
  makeMostPopularNews(mostPopularNews);
});
