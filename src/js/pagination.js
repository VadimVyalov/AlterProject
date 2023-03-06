const btnsContainer = document.getElementById('pagination');
const btnForward = document.querySelector('.next-page');
const btnBackPage = document.querySelector('.prev-page');
const paginContainer = document.querySelector('.pagination');
import { paginationAll } from './apiPagination.js';
// import { createCards } from './cards.js';

btnForward.disabled = true;

export const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 3,
  set totalPage(newTotalPages) {
    this.totalPages = newTotalPages;
  },
  get totalPage() {
    return this.totalPages;
  },
};

makePaginationsBtnMurkUp();

paginContainer.addEventListener('click', e => {
  e.preventDefault();
  handleButton(e.target);
  paginationAll(valuePage.curPage);
  // createCards(valuePage.curPage);
  if (!e.target.classList.contains('pg-link')) {
    return;
  }
  valuePage.curPage = parseInt(e.target.dataset.page);
  makePaginationsBtnMurkUp(valuePage);

  // createCards(valuePage.curPage);
});

export function makePaginationsBtnMurkUp() {
  const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

  const range = delta + 4;

  let render = '';
  let renderTwoSide = '';
  let dot = `<li class="pg-item"><a class="pg-link pg-link--border">...</a></li>`;
  let countTruncate = 0;
  const numberTruncateLeft = curPage - delta;
  const numberTruncateRight = curPage + delta;
  let active = '';
  for (let pos = 1; pos <= totalPages; pos++) {
    active = pos === curPage ? 'active' : '';
    if (totalPages >= 2 * range - 1) {
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
        if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
          renderTwoSide += renderPage(pos, active);
        }
      } else {
        if (
          (curPage < range && pos <= range) ||
          (curPage > totalPages - range && pos >= totalPages - range + 1) ||
          pos === totalPages ||
          pos === 1
        ) {
          render += renderPage(pos, active);
        } else {
          countTruncate++;
          if (countTruncate === 1) render += dot;
        }
      }
    } else {
      render += renderPage(pos, active);
    }
  }
  if (renderTwoSide) {
    renderTwoSide =
      renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
    btnsContainer.innerHTML = renderTwoSide;
  } else {
    btnsContainer.innerHTML = render;
  }
  handleButtonLeft();
  handleButtonRight();
}
function renderPage(index, active = '') {
  return ` <li class="pg-item " >
        <a class="pg-link ${active} " href="#"data-page="${index}">${index}</a>
    </li>`;
}

function handleButton(element) {
  if (element.classList.contains('prev-page')) {
    valuePage.curPage--;
    handleButtonLeft();
    btnForward.disabled = false;
  } else if (element.classList.contains('next-page')) {
    valuePage.curPage++;
    handleButtonRight();
    btnBackPage.disabled = false;
  }

  makePaginationsBtnMurkUp();
}
function handleButtonLeft() {
  if (valuePage.curPage === 1) {
    btnBackPage.disabled = true;
  } else {
    btnBackPage.disabled = false;
  }
}
function handleButtonRight() {
  if (valuePage.curPage === valuePage.totalPages) {
    btnForward.disabled = true;
  } else {
    btnForward.disabled = false;
  }
}
