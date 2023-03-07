import { createCard, arrLastData } from './apiNews';
import { saveLS, loadLS, removeLS } from './lStorage';
//import { checkFavorites } from './must-popular';

const FAIVORIT_NEWS = 'favoritNews';
const gallery = document.querySelector('.gallery');
const errorRequest = document.querySelector('.errorRequest');
//visually - hidden;

function renderFromLS(key) {
  let favoritNews = loadLS(key);

  if (!favoritNews) {
    // console.log('=============');
    return;
  }

  errorRequest.classList.add('visually-hidden');
  gallery.classList.remove('visually-hidden');
  gallery.innerHTML = favoritNews.map(createCard).join('');

  const cardNews = Array.from(document.querySelectorAll('#cardNews'));

  cardNews.forEach(i => {
    i.classList.add('inFavorite');
    const favoriteText = i.querySelector('#favorit-txt');
    favoriteText.textContent = 'Remove from favorite';
  });
}

function removeFromFavorite(e) {
  if (e.target.classList.contains('js-tartet-favorite')) {
    const itemNews = e.target.closest('.js-card-item');
    const favoriteText = itemNews.querySelector('#favorit-txt');
    const newsId = itemNews.dataset.targetId;

    let favoritNews = loadLS(FAIVORIT_NEWS);
    const targetNews = arrLastData.find(i => i.id === newsId);

    const hasNews = favoritNews.findIndex(i => i.id === newsId);
    //console.log(hasNews);

    favoritNews.splice(hasNews, 1);
    saveLS(FAIVORIT_NEWS, favoritNews);
    if (!favoritNews.length) {
      removeLS(FAIVORIT_NEWS);
      errorRequest.classList.remove('visually-hidden');
      gallery.classList.add('visually-hidden');
    }

    itemNews.remove();
  }
}

window.addEventListener('load', () => {
  renderFromLS(FAIVORIT_NEWS);
});
gallery.addEventListener('click', removeFromFavorite);
