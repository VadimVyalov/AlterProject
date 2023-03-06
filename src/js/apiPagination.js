import { saveLS, loadLS } from './lStorage';
import { makeSectionNews } from './filter-categories';
import { makeArticleSectionNews } from './articleSearch';
const LS_KEY = 'lastSearch';

export function paginationAll(n) {
  const lastSeacrh = loadLS(LS_KEY);

  switch (lastSeacrh.type) {
    case 'SECTION':
      lastSeacrh.params.offset = n * 8;
      saveLS(LS_KEY, lastSeacrh);

      makeSectionNews(lastSeacrh);

      break;
    case 'SEARCHE':
      lastSeacrh.params.page = n;
      saveLS(LS_KEY, lastSeacrh);
      makeArticleSectionNews(lastSeacrh);
      break;
  }
}

// const btnsContainer = document.querySelector('.pagination');
// btnsContainer.addEventListener('click', e => {
//   const activeBtn = btnsContainer.querySelector('.active');
//   const pageNum = +activeBtn.dataset.page;
//   paginationAll(pageNum - 1);
// });
