import debounce from 'lodash.debounce';
//import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  makeData,
  createCard,
  dataSectionNormalize,
  arrLastData,
} from './apiNews';
import { sectionList, sectionNews, perPage, maxHits } from './apiUrl';
import { saveLS, loadLS } from './lStorage';
import { valuePage, makePaginationsBtnMurkUp } from './pagination';
//import { savedApiData } from './favorite';
import { savedApiData } from './cards';
const LS_KEY = 'lastSearch';

const gallery = document.querySelector('.gallery');
const categories = document.querySelector('.categories');
const listShow = document.getElementById('categories-show');
const showHideCategoriesBtn = document.getElementById('categories-toggler');
const categoriesContainer = document.querySelector('.categories__container');
const categoriesIcon = document.querySelector(
  '#categories-toggler .categories__icon'
);
const filterItems = document.querySelector('.filter');
const calendarBtn = document.getElementById('menu-calendar');
const calendarText = document.querySelector('.calendar__text');
const calendarIcon = document.querySelector('#menu-calendar .categories__icon');

function rendeSection(item) {
  const { display_name, section } = item;
  return `<li class="categories__item" data-section=${section}>${display_name}</li>
  `;
}

async function makeSection(url) {
  try {
    const Data = await makeData(url);
    listShow.innerHTML = Data.map(rendeSection).join('');
    restart();
  } catch (error) {
    // const msg = error.name === 'CanceledError' ? 'Get timeout' : error;
    // Notify.failure(`Oops ${msg}`);
  }
}

export async function makeSectionNews(url) {
  const weather = document.querySelector('.weather__thumb');
  const sectionHome = document.querySelector('.section_home');
  const errorRequest = document.querySelector('.errorRequest');
  arrLastData.length = 0;
  savedApiData.length = 0;

  try {
    sectionNews.params.limit = perPage;
    const news = await makeData(url);
    arrLastData.push(...news.map(dataSectionNormalize));
    savedApiData.push(...arrLastData);
    gallery.innerHTML = arrLastData.map(createCard).join('');
    gallery.prepend(weather);
    errorRequest.classList.add('visually-hidden');
    sectionHome.classList.remove('visually-hidden');
  } catch (error) {}
}

//?===== function  render

function restart() {
  let maxWidth = document
    .querySelector('.categories')
    .getBoundingClientRect().width;
  let count = 0;
  if (maxWidth >= 768) count = 4;
  if (maxWidth >= 1280) count = 6;

  if (!count) {
    showHideCategoriesBtn.querySelector('span').textContent = 'Categories';
    categoriesContainer.classList.add('no-categories');
  } else {
    showHideCategoriesBtn.querySelector('span').textContent = 'Others';
    categoriesContainer.classList.remove('no-categories');
  }

  sortSections(count);
}

function sortSections(count) {
  let elementShow = Array.from(
    document.querySelectorAll('#categories-show .categories__item')
  );
  let elementHide = Array.from(
    document.querySelectorAll('#categories-hide .categories__item')
  );
  const list = [...elementShow, ...elementHide];

  const listShow = document.getElementById('categories-show');
  const listHide = document.getElementById('categories-hide');

  elementShow = [];
  elementHide = [];

  for (let i = 0; i < list.length; i++) {
    if (i < count) {
      elementShow.push(list[i]);
    } else elementHide.push(list[i]);
  }
  listShow.innerHTML = '';
  listHide.innerHTML = '';
  listShow.append(...elementShow);
  listHide.append(...elementHide);
}

//!=== listener

showHideCategoriesBtn.addEventListener('click', () => {
  filterItems.classList.toggle('filter-show');
  categoriesIcon.classList.toggle('rotate');
});

calendarBtn.addEventListener('click', () => {
  calendarIcon.classList.toggle('rotate');
});

categories.addEventListener('click', e => {
  if (
    e.target.nodeName === 'LI' &&
    e.target.classList.contains('categories__item')
  ) {
    const listItem = categories.querySelectorAll('.categories__item');
    listItem.forEach(item => item.classList.remove('activ'));
    e.target.classList.add('activ');
    categoriesIcon.classList.remove('rotate');
    filterItems.classList.remove('filter-show');

    sectionNews.subUrl = e.target.dataset.section;
    sectionNews.type = 'SECTION';

    saveLS(LS_KEY, sectionNews);

    (async () => {
      try {
        makeSectionNews(sectionNews);

        sectionNews.params.limit = maxHits;
        const news = await makeData(sectionNews);
        valuePage.totalPage = Math.floor(news.length / perPage);
        sectionNews.params.limit = perPage;
        makePaginationsBtnMurkUp();
      } catch (error) {
        console.log(error);
      }
    })();
  }
});

window.addEventListener('load', () => {
  makeSection(sectionList);
});

window.addEventListener('resize', debounce(restart, 250));
