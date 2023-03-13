// Для Альбины

const dateBlockContainer = document.getElementById('readNews');

dateBlockContainer.addEventListener('click', read);

function read(event) {
  if (event.target.classList.contains('date-title')) {
    event.target.nextSibling.classList.toggle('visually-hidden');
    event.target.classList.toggle('rotate');
  }
}
