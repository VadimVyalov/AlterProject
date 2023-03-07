import axios from 'axios';
import { makeURL } from './apiUrl';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';

//! масив для якихось цілей. В ньому будуть лежати обєкти
//! з останньго запиту як в картці

export const arrLastData = [];

//! запит до сервера модифікований
//! можно використовувати стандартний
//! timeout можно не задавати, то я робив
//! для перевірки навантаження з можливістю
//! примусового збросу запиту

export async function getData(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await axios.get(url, {
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

//! Отримання данних з серверу
//! Заточено під сервер api.nytimes.com працює з
//! усіма розділами сервера
//! приймає валідний URL та повертає масив з даними
//!  обробка різних 4хх помилок і відображення відповідної сторінки

export async function makeData(url) {
  const URL = makeURL(url);
  try {
    const Data = await getData(URL);

    if (Data.data.status !== 'OK') {
      throw new Error(Data.data.status);
    }

    if (typeof Data.data['response'] !== 'undefined') {
      if (!Data.data.response.docs.length) {
        throw new Error('Нічого не знайшлось');
      }
      return Data.data.response.docs;
    }
    if (!Data.data.results.length) {
      throw new Error('Нічого не знайшлось');
    }
    return Data.data.results;
  } catch (error) {
    // const msg = error.name === 'CanceledError' ? 'Get timeout' : error;
    // console.log(msg);
    // Notify.failure(`Oops ${msg}`);
    console.log(error);
    const sectionHome = document.querySelector('.section_home');
    const errorRequest = document.querySelector('.errorRequest');

    errorRequest.classList.remove('visually-hidden');
    sectionHome.classList.add('visually-hidden');
  }
}

//! нормалізація данних від сервера
//! на вхід іде обєкт з массиву даних від сервера
//! на виході обєкт з перевіренних данних
//! для рендеру картки
//TODO треба нормальна перевірка мультімедіі з обиранням найліпшого варіанта
//? час та натхнення
//* ======= розділ Section (категорії)
export function dataSectionNormalize(item) {
  const { uri, url, title, section, abstract, published_date, multimedia } =
    item;
  //const id = uri;
  const imgUrl = multimedia !== null ? multimedia[2].url : '';
  const newDateStr = published_date
    .slice(0, published_date.indexOf('T'))
    .trim()
    .split('-')
    .reverse()
    .join('/');
  return { id: uri, url, title, section, abstract, imgUrl, newDateStr };
}

//* ======= розділ Article Search (пошук по запиту)
export function dataArticleSearchNormalize(item) {
  const {
    uri,
    web_url,
    headline: { main },
    section_name,
    abstract,
    pub_date,
    multimedia,
  } = item;

  const imgUrl =
    multimedia.length !== 0
      ? `https://static01.nyt.com/${multimedia[2].url}`
      : '';
  const newDateStr = pub_date
    .slice(0, pub_date.indexOf('T'))
    .trim()
    .split('-')
    .reverse()
    .join('/');
  return {
    id: uri,
    url: web_url,
    title: main,
    section: section_name,
    abstract,
    imgUrl,
    newDateStr,
  };
}

//* ======= розділ Most Popular (популярні новини)

export function dataMostPopularNormalize(item) {
  const { uri, url, title, section, abstract, published_date, media } = item;
  //const id = uri;
  const imgUrl = media.length !== 0 ? media[0]['media-metadata'][2].url : '';
  const newDateStr = published_date
    .slice(0, published_date.indexOf('T'))
    .trim()
    .split('-')
    .reverse()
    .join('/');
  return { id: uri, url, title, section, abstract, imgUrl, newDateStr };
}

//! рендер картки (сам поцупив)
//! на вхід треба передати нормалізований обїект
const iconHeart = new URL('../images/icon.svg', import.meta.url);
export function createCard(item) {
  const { id, url, title, section, abstract, imgUrl, newDateStr } = item;

  return `
       <li id="cardNews" data-target-id="${id}"  class="card js-card-item" >
        <div class="wrap-image">
          <img
            src="${imgUrl}"
            alt="photo"
           class="wrap-image__photo"
           loading="lazy"
          />
          <p class="wrap-image__text">${section}</p>
          <button type="button" id="favorit-btn" class="wrap-image__btn js-tartet-favorite">
          <span id="favorit-txt" class="wrap-image__btn-text js-tartet-favorite">Add to favorite</span>
           <svg id="favorit-icon"class="wrap-image__icon js-tartet-favorite" width="16" height="16">
                <use href ='${iconHeart}#icon-heart' class="js-tartet-favorite"></use>
              </svg></button>
        </div>
        <h2 class="card__title">${title}</h2>
        <p class="card__description">${
          abstract.length > 112 ? abstract.slice(0, 113) + '...' : abstract
        }</p>
        <div class="wrap-info">
          <p class="wrap-info__time">${newDateStr}</p>
          <a href="${url}" target="_blank" rel="noreferrer noopener" class="wrap-info__link">Read more</a>
        </div>
      </li>
        `;
}
