import { saveLS, loadLS, removeLS } from './lStorage';
import { checkFavorites, togleFaforite, createCard } from './apiCard';
const FAIVORIT_NEWS = 'favoriteNews';
const gallery = document.querySelector('.gallery');
const errorRequest = document.querySelector('.errorRequest');

function renderFromLS(key) {
  const favoritNews = loadLS(key);
  if (!favoritNews) {
    return;
  }

  errorRequest.classList.add('visually-hidden');
  gallery.classList.remove('visually-hidden');
  gallery.innerHTML = favoritNews.map(createCard).join('');

  const cardNews = Array.from(document.querySelectorAll('.card'));

  cardNews.forEach(i => {
    i.classList.add('inFavorite');
    const favoriteText = i.querySelector('.favorite-description');
    favoriteText.textContent = 'Remove from favorite';
  });
}

function removeFromFavorite(e) {
  if (e.target.classList.contains('js-tartet-favorite')) {
    const itemNews = e.target.closest('.js-card-item');
    const newsId = itemNews.dataset.targetId;
    const favoritNews = loadLS(FAIVORIT_NEWS);
    const hasNews = favoritNews.findIndex(i => i.id === newsId);

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
