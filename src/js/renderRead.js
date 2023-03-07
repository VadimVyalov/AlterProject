import { createCard, icon, arrLastData } from './apiNews';
import { saveLS, loadLS, removeLS } from './lStorage';
import { checkFavorites, togleFaforite, addRead } from './apiCard';

const READ_NEWS = 'readNews';
const FAIVORIT_NEWS = 'favoritNews';

const gallery = document.querySelector('.date-block');
const errorRequest = document.querySelector('.errorRequest');

function renderFromLS(key) {
  let favoritNews = loadLS(key);
  arrLastData.length = 0;
  arrLastData.push(...favoritNews);
  // console.log(arrLastData);
  let readDate = '0000/00/00';

  if (!favoritNews) {
    console.log('=============');
    return;
  }

  // console.log(favoritNews);
  errorRequest.classList.add('visually-hidden');
  gallery.classList.remove('visually-hidden');

  readDate = favoritNews[0].readDate;
  favoritNews.push({ readDate: '0' });
  const tempBlock = [];
  favoritNews.forEach(i => {
    if (readDate !== i.readDate) {
      const dateTitle = document.createElement('div');
      dateTitle.innerHTML = `<span class="btn-span">${readDate}</span>
                                    <svg class="icon-down-read-pg" width="15" height="9">
                                         <use href="${icon}#icon-arrow-down"></use>
                                    </svg>`;
      gallery.append(dateTitle);
      const dateBlock = document.createElement('UL');
      dateBlock.classList.add('gallery');
      dateBlock.innerHTML = tempBlock.map(createCard).join('');
      gallery.append(dateBlock);
      readDate = i.readDate;
      tempBlock.length = 0;
    }
    tempBlock.push(i);
  });
  checkFavorites(FAIVORIT_NEWS);
  favoritNews.pop();
  loadLS(READ_NEWS, favoritNews);
}

window.addEventListener('load', () => {
  renderFromLS(READ_NEWS);
});

function lostFavorite() {
  let favoritNews = loadLS(key);
  arrLastData.length = 0;
  arrLastData.push(...favoritNews);
}

// function loadFromRead(e) {
//   //e.preventDefault();
//   if (e.target.classList.contains('js-tartet-favorite')) {
//     const itemNews = e.target.closest('.js-card-item');
//     const favoriteText = itemNews.querySelector('#favorit-txt');
//     const newsId = itemNews.dataset.targetId;

//     const cardNews = Array.from(document.querySelectorAll('#cardNews'));
//     const temp = loadLS(READ_NEWS);
//     const arrLastData = [];
//     arrLastData.push(...temp);

//     console.log(arrLastData);
//     let readNews = loadLS(FAIVORIT_NEWS);

//     let targetNews = arrLastData.find(i => i.id === newsId);
//     // console.log(targetNews);
//     // console.log(arrLastData[targetNews]);

//     if (!readNews) {
//       readNews = [];
//       readNews.push(targetNews);
//       saveLS(FAIVORIT_NEWS, readNews);
//       itemNews.classList.add('inFavorite');
//       favoriteText.textContent = 'Remove from favorite';
//       return;
//     }

//     const hasNews = readNews.findIndex(i => i.id === newsId);
//     //console.log(hasNews);
//     if (hasNews < 0) {
//       readNews.push(targetNews);

//       saveLS(FAIVORIT_NEWS, readNews);
//       itemNews.classList.add('inFavorite');
//       favoriteText.textContent = 'Remove from favorite';
//     } else {
//       readNews.splice(hasNews, 1);

//       saveLS(FAIVORIT_NEWS, readNews);
//       if (!readNews.length) removeLS(FAIVORIT_NEWS);
//       itemNews.classList.remove('inFavorite');
//       favoriteText.textContent = 'Add to favorite';
//     }
//   }
// }

const readBlock = document.querySelector('#readNews');
console.log(readBlock);
//gallery.addEventListener('click', togleFaforite);
//readBlock.addEventListener('click', addRead);

readBlock.addEventListener('click', togleFaforite);
//"nyt://article/536ba01e-197e-5ae0-8cef-256a82132ace"
//'nyt://article/536ba01e-197e-5ae0-8cef-256a82132ace';
