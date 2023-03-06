// import { getCards } from './cards';
// import { getFavoriteId } from './add-to-favorite';

//  const STORAGE_KEY = 'favoriteNews';

// async function getApiData() {
//   const response = await getCards();
//   const data = response.data.results;
//   //   console.log(data);
//   saveApiData(data);
// }
// export const savedApiData = [];
// function saveApiData(arrey) {
//   arrey.map(({ id, url, title, section, abstract, published_date, media }) => {
//     const item = {};
//     let imgUrl = media.map(media => media['media-metadata'][2].url);
//     item['id'] = `${id}`;
//     item['url'] = `${url}`;
//     item['title'] = `${title}`;
//     item['section'] = `${section}`;
//     item['abstract'] = `${abstract}`;
//     item['published_date'] = `${published_date}`;
//     item['imgUrl'] = `${imgUrl}`;
//     savedApiData.push(item);
//     // localStorage.setItem(STORAGE_KEY, JSON.stringify(savedApiData));

//     // console.log("🚀 ~ arrey.map ~ item:", item)
//   });
//   // console.log('savedApiData', savedApiData);
// }
// getApiData();

// const favoriteList = document.querySelector('.favorite');

// favoriteList.addEventListener('click', getFavoriteId)
