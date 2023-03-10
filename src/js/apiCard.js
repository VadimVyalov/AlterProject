import { saveLS, loadLS, removeLS } from './lStorage';
import { arrLastData } from './apiNews';

const FAIVORIT_NEWS = 'favoriteNews';
const READ_NEWS = 'readNews';

export const icon = new URL('../images/icon.svg', import.meta.url);

export function togleFaforite(e) {
  // console.log(e.target);
  if (e.target.classList.contains('js-tartet-favorite')) {
    const itemNews = e.target.closest('.js-card-item');
    const favoriteText = itemNews.querySelector('.favorite-description');
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
  e.preventDefault();

  if (e.target.classList.contains('wrap-info__link')) {
    const itemNews = e.target.closest('.js-card-item');
    //  const readText = itemNews.querySelector('.js-read-description');
    const newsId = itemNews.dataset.targetId;
    itemNews.classList.add('inRead');
    // readText.classList.remove('visually-hidden');
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
        // const readText = i.querySelector('.js-read-description');
        // readText.classList.remove('visually-hidden');
      }
    });
  }
}

export function createCard(item) {
  const { id, url, title, section, abstract, imgUrl, newDateStr } = item;

  return `
         <li class="card  js-card-item" data-target-id="${id}">

           <button type="button" class="toogle-favorite js-tartet-favorite">
              <span class="favorite-description">Add to favorite</span>
              <svg  width="16" height="16">
                <use href ='${icon}#icon-heart' class="icon-favorite"></use>
              </svg>
          </button> 
          
          <div class="wrap-image">
             <p class="js-read-description">Already read</p>
             <p class="wrap-image__text">${section}</p>
              <img
                src="${imgUrl}"
                alt="photo"
                class="wrap-image__photo"
                width=400 height=400
                loading="lazy"
                />
            <h2 class="card__title">${title}</h2>
            <p class="card__abstract">${abstract}</p>
            <p class="wrap-info__time">${newDateStr}</p>
            <a href="${url}" title="read oridginal news" class="wrap-info__link" target="_blank" rel="noreferrer noopener">
                <span class="visually-hidden">read oridginal news</span> Read more 
            </a>
         </div>   
      </li>
     `;
}
