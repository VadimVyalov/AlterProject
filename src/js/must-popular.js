import {
  makeData,
  createCard,
  dataMostPopularNormalize,
  arrLastData,
} from './apiNews';
import { mostPopularNews, perPage } from './apiUrl';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { saveLS, loadLS, removeLS } from './lStorage';
//import { savedApiData } from './cards';
//import { savedApiData } from './favorite';

const LS_KEY = 'lastSearch';
const FAIVORIT_NEWS = 'favoritNews';
const gallery = document.querySelector('.gallery');
const searhForm = document.querySelector('#search-form');
const filterItems = document.querySelector('.filter');
const categories = document.querySelector('.categories');
const weather = document.querySelector('.weather__thumb');
const sectionHome = document.querySelector('.section_home');
const errorRequest = document.querySelector('.errorRequest');

export async function makeMostPopularNews(url) {
  arrLastData.length = 0;

  // console.log('nen');
  try {
    const news = await makeData(url);

    arrLastData.push(...news.map(dataMostPopularNormalize));

    //  arrLastData.splice(perPage);
    //  savedApiData.push(...arrLastData);

    gallery.innerHTML = arrLastData.map(createCard).join('');
    gallery.prepend(weather);
    errorRequest.classList.add('visually-hidden');
    sectionHome.classList.remove('visually-hidden');

    checkFavorites(FAIVORIT_NEWS);
  } catch (error) {
    console.log(error);
  }
}

function togleFaforite(e) {
  if (e.target.classList.contains('js-tartet-favorite')) {
    const itemNews = e.target.closest('.js-card-item');
    const favoriteText = itemNews.querySelector('#favorit-txt');
    const newsId = itemNews.dataset.targetId;

    let favoritNews = loadLS(FAIVORIT_NEWS);
    const targetNews = arrLastData.find(i => i.id === newsId);

    // console.log(itemNews);

    if (!favoritNews) {
      favoritNews = [];
      favoritNews.push(targetNews);
      saveLS(FAIVORIT_NEWS, favoritNews);
      itemNews.classList.add('inFavorite');
      favoriteText.textContent = 'Remove from favorite';
      return;
    }

    const hasNews = favoritNews.findIndex(i => i.id === newsId);
    //console.log(hasNews);
    if (hasNews < 0) {
      favoritNews.push(targetNews);
      saveLS(FAIVORIT_NEWS, favoritNews);
      itemNews.classList.add('inFavorite');
      favoriteText.textContent = 'Remove from favorite';
    } else {
      favoritNews.splice(hasNews, 1);

      saveLS(FAIVORIT_NEWS, favoritNews);
      if (!favoritNews.length) removeLS(FAIVORIT_NEWS);
      itemNews.classList.remove('inFavorite');
      favoriteText.textContent = 'Add to favorite';
    }
  }
}

export function checkFavorites(key) {
  let favoritNews = loadLS(key);
  const cardNews = Array.from(document.querySelectorAll('#cardNews'));

  if (favoritNews) {
    const allId = favoritNews.map(i => i.id);
    cardNews.forEach(i => {
      if (allId.includes(i.dataset.targetId)) {
        i.classList.add('inFavorite');
        const favoriteText = i.querySelector('#favorit-txt');
        favoriteText.textContent = 'Remove from favorite';
      }
    });
  }
}

gallery.addEventListener('click', togleFaforite);

window.addEventListener('load', () => {
  makeMostPopularNews(mostPopularNews);
});
