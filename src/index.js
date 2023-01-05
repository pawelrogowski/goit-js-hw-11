apiKey = process.env.PIXABAY_API_KEY;
console.log(process.env.PIXABAY_API_KEY);

import axios from 'axios';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
console.log(apiKey);
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.search-form__input');
const galleryElement = document.querySelector('.gallery');

async function fetchImage(query, options) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: `'${apiKey}'`,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        ...options,
      },
    });
    console.log(response.data.hits);
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
}

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const query = searchInput.value;
  const imageData = await fetchImage(query, {});
  galleryElement.innerHTML = '';
  let imageHTML = '';
  imageData.forEach(image => {
    imageHTML += `<a class="gallery__item" href="${image.largeImageURL}"><img class="gallery__image" src="${image.webformatURL}"></a>`;
  });
  galleryElement.innerHTML = imageHTML;
  const lightbox = new SimpleLightbox('.gallery .gallery__item', {
    captionPosition: 250,
    disableScroll: false,
  });
  lightbox.refresh();
});
