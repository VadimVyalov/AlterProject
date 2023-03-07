const gallery = document.querySelector('.gallery');

import { togleFaforite, addRead } from './apiCard';

gallery.addEventListener('click', togleFaforite);
gallery.addEventListener('click', addRead);
