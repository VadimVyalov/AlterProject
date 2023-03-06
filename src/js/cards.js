import axios from 'axios';
// const API_KEY = 'VPd8ESOXXGRNi6SUHc4QYJMXdqmRVK3K';
import { KEY } from './api-key';

export async function getCards() {
  const URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${KEY}`;
  const requestData = await axios.get(URL);
  return requestData;
}
const STORAGE_KEY = 'favoriteNews';
const storageNews = JSON.parse(localStorage.getItem(STORAGE_KEY));
const iconHeart = new URL('../images/icon.svg', import.meta.url);

const refs = {
  gallery: document.querySelector('.gallery'),
};
export const savedApiData = [];

export async function createCards() {
  try {
    const response = await getCards();
    const data = response.data.results;
    // console.log(data);
    createMarkup(data);
    saveApiData(data);
  } catch (error) {
    console.error('Error from backend:', error);
  }
}

createCards();

export function createMarkup(arr) {
  const markup = arr
    .map(({ id, url, title, section, abstract, published_date, media }) => {
      let imgUrl = media.map(media => media['media-metadata'][2].url);
      let newDateStr = published_date;
      //Проверка есть ли эта новость в Favorite
      // checkIsNewFavorite(id)
      // console.log("🚀 ~ storageNews:", storageNews)
      if (
        Boolean(storageNews) &&
        storageNews.some(el => Number(el.id) === Number(id))
      ) {
        // console.log(" Перевірка! Есть favorite новости")
        return `<li class="card js-card-item" data-target-id=${id}>
        <div class="wrap-image">
          <img
            src="${imgUrl}"
            alt="photo"
            class="wrap-image__photo"
          />
          <p class="wrap-image__text">${section}</p>
          <button type="button"  class="wrap-image__btn js-is-favorite">
          <span class="wrap-image__btn-text js-is-favorite ">Remove from favorite</span>
            <svg class="js-is-favorite fill-heard" width="16" height="16">
                <use class="js-is-favorite" href ='${iconHeart}#icon-heart'></use>
            </svg>
          </button>
        
        </div>
            <h2 class="card__title">${title}</h2>
            <p class="card__description">${
              abstract.length > 112 ? abstract.slice(0, 113) + '...' : abstract
            }</p>
                <p class="wrap-info__time">${newDateStr}</p>
                <a href="${url}" class="wrap-info__link">Read more</a>
                <p class="wrap-image__active visually-hidden">Already read</p>
        </li>`;
      }
      //
      else
        return `
         <li class="card  js-card-item" data-target-id="${id}">
      <div class="wrap-image">
          <img
            src="${imgUrl}"
            alt="photo"
           class="wrap-image__photo"
          />
          <p class="wrap-image__text">${section}</p>
          <button type="button" class="wrap-image__btn js-tartet-favorite">
          <span class="wrap-image__btn-text js-tartet-favorite">Add to favorite</span>
           <svg class="wrap-image__icon js-tartet-favorite" width="16" height="16">
                <use href ='${iconHeart}#icon-heart' class="js-tartet-favorite"></use>
              </svg></button>
        </div>
        <h2 class="card__title">${title}</h2>
        <p class="card__description">${
          abstract.length > 112 ? abstract.slice(0, 113) + '...' : abstract
        }</p>
          <p class="wrap-info__time">${newDateStr}</p>
          <a href="${url}" class="wrap-info__link" target="_blank" rel="noreferrer noopener">Read more</a>
          <p class="wrap-image__active visually-hidden">Already read</p>
      </li>
     `;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function saveApiData(arrey) {
  arrey.map(({ id, url, title, section, abstract, published_date, media }) => {
    const item = {};
    let imgUrl = media.map(media => media['media-metadata'][2].url);
    let newDateStr = published_date.replace(/-/g, '/');
    item['id'] = `${id}`;
    item['url'] = `${url}`;
    item['title'] = `${title}`;
    item['section'] = `${section}`;
    item['abstract'] = `${abstract}`;
    item['newDateStr'] = newDateStr;
    item['imgUrl'] = imgUrl;
    savedApiData.push(item);
  });
  // console.log('savedApiData', savedApiData);
}
