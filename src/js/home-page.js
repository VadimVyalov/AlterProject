const gallery = document.querySelector('.gallery');
const weather = document.querySelector('.weather__thumb');

const galleryItem = document.querySelector('.card:nth-child(3)');
//console.log(galleryItem);

//galleryItem.parentNode.insertBefore(weather, galleryItem);
// galleryItem.insertBefore(weather, galleryItem);

// gallery.replaceChild(weather, galleryItem);

gallery.prepend(weather);

// gallery.append(weather);
