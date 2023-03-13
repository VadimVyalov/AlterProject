import { saveLS, loadLS, removeLS } from './lStorage';
import { arrLastData } from './apiNews';

const FAIVORIT_NEWS = 'favoriteNews';
const READ_NEWS = 'readNews';
const iconHeart = new URL('../images/icon.svg', import.meta.url);

export function togleFaforite(e) {
  if (e.target.classList.contains('favorit-bth')) {
    const itemNews = e.target.closest('.js-card-item');
    const favoriteText = itemNews.querySelector('favorite-description');
    const newsId = itemNews.dataset.targetId;

    let favoritNews = loadLS(FAIVORIT_NEWS);
    let targetNews = arrLastData.find(i => i.id === newsId);

    if (!favoritNews) {
      favoritNews = [];
      favoritNews.push(targetNews);
      saveLS(FAIVORIT_NEWS, favoritNews);
      itemNews.classList.add('inFavorite');
      favoriteText.textContent = 'Remove from favorite';
      return;
    }

    const hasNews = favoritNews.findIndex(i => i.id === newsId);

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
  const cardNews = Array.from(document.querySelectorAll('.card'));
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

export function addRead(e) {
  // e.preventDefault();

  if (e.target.classList.contains('wrap-info__link')) {
    const itemNews = e.target.closest('.js-card-item');
    const readText = itemNews.querySelector('.wrap-image__active');
    const newsId = itemNews.dataset.targetId;
    itemNews.classList.add('inRead');
    readText.classList.remove('visually-hidden');
    let readNews = loadLS(READ_NEWS);
    const targetNews = arrLastData.find(i => i.id === newsId);

    const readDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    targetNews.readDate = readDate;

    if (!readNews) {
      readNews = [];
      readNews.push(targetNews);
      saveLS(READ_NEWS, readNews);

      return;
    }

    const hasNews = readNews.findIndex(i => i.id === newsId);

    if (hasNews < 0) {
      readNews.push(targetNews);
      saveLS(READ_NEWS, readNews);
    } else {
      readNews.splice(hasNews, 1);
      readNews.push(targetNews);
      saveLS(READ_NEWS, readNews);
      if (!readNews.length) removeLS(READ_NEWS);
    }
  }
}

export function checkRead(key) {
  let readNews = loadLS(key);
  const cardNews = Array.from(document.querySelectorAll('.card'));

  if (readNews) {
    const allId = readNews.map(i => i.id);
    cardNews.forEach(i => {
      if (allId.includes(i.dataset.targetId)) {
        i.classList.add('inRead');
        //       const readText = i.querySelector('.js-read-description');
        //        readText.classList.remove('visually-hidden');
      }
    });
  }
}

export function createCard(item) {
  const { id, url, title, section, abstract, imgUrl, newDateStr } = item;

  return `
         <li class="card  js-card-item" data-target-id="${id}">
      <div class="wrap-image">
          <img
            src="${imgUrl}"
            alt="photo"
           class="wrap-image__photo"
           loading="lazy"
          />
          <p class="wrap-image__text">${section}</p>
          <button type="button" class="wrap-image__btn js-tartet-favorite favorit-bth">
          <span class="js-favorite-description">Add to favorite</span>
           <svg class="js-tartet-favorite" width="16" height="16">
                <use href ='${iconHeart}#icon-heart' class="icon-favorite"></use>
              </svg></button>
        </div>
        <h2 class="card__title">${title}</h2>
        <p class="card__description">${
          abstract.length > 112 ? abstract.slice(0, 113) + '...' : abstract
        }</p>
          <p class="wrap-info__time">${newDateStr}</p>
          <a href="${url}" title="read oridginal news" class="wrap-info__link" target="_blank" rel="noreferrer noopener">
          <span class="visually-hidden">read oridginal news</span> Read more </a>
          <p class="js-read-description visually-hidden">Already read</p>
      </li>
     `;
}
