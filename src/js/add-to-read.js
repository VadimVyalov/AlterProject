import { savedApiData } from './cards';


const STORAGE_KEY = 'readNews';

let readNews = [];

const gallery = document.querySelector('.gallery');


gallery.addEventListener('click', getReadNewsId);

export default function getReadNewsId(event) {
  //  console.log("🚀 date:", readDate);

  if (event.target.classList.contains('wrap-info__link')) {
    event.preventDefault();
    event.target.parentNode.style.opacity = '40%';
    event.target.nextElementSibling.classList.remove('visually-hidden'); 
    const id = event.target.closest('.js-card-item').dataset.targetId;
    saveReadNew(id);
  }
}

export function saveReadNew(id) {
  const readDate = new Date().toLocaleDateString().replaceAll('.', '/');
  const readNew = savedApiData.find(item => item.id === id);
  readNew.readDateNew = readDate;

  if (readNews.length < 0) {
    readNews.push(readNew);
  }

  if (readNews.every(el => Number(el.id) !== Number(id))) {
    readNews.push(readNew);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(readNews));
  }
}
// // ***********************************
