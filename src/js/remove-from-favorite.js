const STORAGE_KEY = 'favoriteNews';
const favoriteList = document.querySelector('.gallery');
const errorRequest = document.querySelector(".errorRequest");

favoriteList.addEventListener('click', getFavoriteId);

function getFavoriteId(evt) {
  if (evt.target.classList.contains('js-is-favorite')) {
    const id = evt.target.closest('.js-card-item').dataset.targetId;
    removeFromFavorite(id);
  }
}

function removeFromFavorite(id) {
  const favoriteBtnText = document.querySelector(
    `li[data-target-id='${id}'] span.js-is-favorite`
  );
  const favoriteBtn = document.querySelector(
    `li[data-target-id='${id}'] button.js-is-favorite`
  );
  const favoriteSvg = document.querySelector(
    `li[data-target-id='${id}'] svg.js-is-favorite`
  );
  const favoriteUse = document.querySelector(
    `li[data-target-id='${id}'] use.js-is-favorite`
  );
  const galleryItem = document.querySelector(
    `li[data-target-id='${id}']`
  );

  let storageNews = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const removedNewIndex = storageNews.findIndex(
    item => Number(item.id) === Number(id)
  );
  storageNews.splice(removedNewIndex, 1);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageNews));
//Якщо не має улюблених новин, очищаємо localStorage
  storageNews=JSON.parse(localStorage.getItem(STORAGE_KEY))
    if(storageNews.length===0){
      localStorage.removeItem(STORAGE_KEY)
      errorRequest.classList.remove('visually-hidden')
    }

  favoriteBtnText.classList.replace('js-is-favorite', 'js-tartet-favorite');
  favoriteBtn.classList.replace('js-is-favorite', 'js-tartet-favorite');
  favoriteSvg.classList.replace('js-is-favorite', 'js-tartet-favorite');
  favoriteUse.classList.replace('js-is-favorite', 'js-tartet-favorite');

  galleryItem.remove()
}

