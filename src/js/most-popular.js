import { makeData, dataMostPopularNormalize, arrLastData } from './apiNews';
import { mostPopularNews, sectionNews, countSearch } from './apiUrl';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { saveLS, loadLS, removeLS } from './lStorage';
import { createCard, checkFavorites, checkRead } from './apiCard';
import { valuePage, makePaginationsBtnMurkUp } from './pagination';
const LS_KEY = 'lastSearch';
const FAIVORIT_NEWS = 'favoritNews';
const gallery = document.querySelector('.gallery');

const weather = document.querySelector('.weather__thumb');
const sectionHome = document.querySelector('.section_home');
const errorRequest = document.querySelector('.errorRequest');

async function makeMostPopularNews(url) {
  arrLastData.length = 0;
  sectionNews.type = 'POPULAR';
  valuePage.curPage = 1;

  saveLS(LS_KEY, sectionNews);

  try {
    const news = await makeData(url);
    //console.log(news)
    arrLastData.push(...news.map(dataMostPopularNormalize));
    renderFromLast(1, countSearch.perPage);
    errorRequest.classList.add('visually-hidden');
    sectionHome.classList.remove('visually-hidden');
    checkFavorites(FAIVORIT_NEWS);
  } catch (error) {
    console.log(error);
  }
}

export function renderFromLast(page, count) {
  const arrTempData = [...arrLastData].splice((page - 1) * count, count);
  //arrTempData.splice((page - 1) * count, count);
  gallery.innerHTML = arrTempData.map(createCard).join('');
  gallery.prepend(weather);
  console.log(arrTempData.length);
}

window.addEventListener('load', () => {
  makeMostPopularNews(mostPopularNews);
});
