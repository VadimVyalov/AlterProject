
const favoriteList = document.querySelector(".gallery");
const errorRequest = document.querySelector(".errorRequest");
export const iconHeart = new URL('../images/icon.svg', import.meta.url);
const STORAGE_KEY = 'favoriteNews';
const storageNews=JSON.parse(localStorage.getItem(STORAGE_KEY))

export default function createMarkupFavorite() {
    
    
    // console.log("🚀 ~ storageNews:", storageNews)

        if (!Boolean(storageNews)) {
          errorRequest.classList.remove('visually-hidden')
          return
        }

  let markup = "";
  
  markup = storageNews
    .map(({ id, section, imgUrl, title, abstract, newDateStr, url }) => {
      
      return `<li class="card js-card-item" data-target-id=${id}>
        <div class="wrap-image">
          <img
            src="${imgUrl}"
            alt="photo"
            class="wrap-image__photo"
          />
          <p class="wrap-image__text">${section}</p>
          <button type="button"  class="wrap-image__btn js-is-favorite">
            <span class="wrap-image__btn-text js-is-favorite">Remove from favorite</span>
              <svg class="js-is-favorite fill-heard" width="16" height="16">
                <use class="js-is-favorite" href ='${iconHeart}#icon-heart'></use>
              </svg>
          </button>
        
        </div>
            <h2 class="card__title">${title}</h2>
            <p class="card__description">${abstract.length > 112 ? abstract.slice(0, 113) + '...' : abstract}</p>
            <div class="wrap-info">
                <p class="wrap-info__time">${newDateStr}</p>
                <a href="${url}" class="wrap-info__link">Read more</a>
            </div>
      </li>`;
    })
    .join("");
    favoriteList.insertAdjacentHTML("beforeend", markup);
}

createMarkupFavorite();

