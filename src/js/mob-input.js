const iconSearch = document.querySelector('.btn-search');

const headerInput = document.querySelector('.input-text');


iconSearch.addEventListener('click', iconSearchClick);

function iconSearchClick() {
  if (document.documentElement.clientWidth < 768) {
    headerInput.classList.toggle('mob-input');
    iconSearch.style.position = 'absolute';
    iconSearch.style.top = '6px';
    iconSearch.style.left = '14px';
  }}
  if (!headerInput.classList.contains('mob-input')) {
    iconSearch.style.position= '';
   


  }


