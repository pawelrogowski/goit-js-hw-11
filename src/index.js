import axios from 'axios';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('.search-form__input');
const galleryElement = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const pageBottom = document.querySelector('.page-bottom');

loadMoreButton.style.display = 'none';
let firstSearchCompleted = false;
let lastQuery = null;
let page = 1;

function isNewQuery() {
  if (lastQuery !== searchInput.value) {
    return true;
  }
  return false;
}

async function fetchImage(query, options, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '32579471-afdc8e0303a1983f0362481fc',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
        ...options,
      },
    });

    // if (!firstSearchCompleted) {
    if (response.data.totalHits > 0 && isNewQuery()) {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    } else if (isNewQuery()) {
      Notify.failure(`Sorry no images for "${searchInput.value}" found`);
    }
    // }
    return response.data.hits;
  } catch (error) {
    console.error(error);
    Notify.failure('An error occurred while fetching images');
  }
}

function updateGallery(imageData) {
  let imageHTML = '';
  imageData.forEach(image => {
    imageHTML += `
    <a class="gallery__item" href="${image.largeImageURL}">
    <figure class="gallery__figure">
      <img class="gallery__img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy">
      <figcaption class="gallery__figcaption">
        <div class="gallery__caption">Likes: ${image.likes}</div>
        <div class="gallery__caption">Views: ${image.views}</div>
        <div class="gallery__caption">Comments: ${image.comments}</div>
        <div class="gallery__caption">Downloads: ${image.downloads}</div>
      </figcaption>
    </figure>
  </a>`;
  });
  galleryElement.innerHTML += imageHTML;
  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.gallery .gallery__item');

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  galleryElement.innerHTML = '';
  page = 1;
  const imageData = await fetchImage(searchInput.value, {}, page);
  updateGallery(imageData);
  firstSearchCompleted = true;
  lastQuery = searchInput.value;
  if (galleryElement.innerHTML !== '') {
    loadMoreButton.style.display = 'block';
  }
});

loadMoreButton.addEventListener('click', async function () {
  page++;
  const imageData = await fetchImage(searchInput.value, {}, page);
  updateGallery(imageData);
  observer.observe(pageBottom);
  loadMoreButton.style.display = 'none';
});

const observer = new IntersectionObserver(async (entries, observer) => {
  if (entries[0].isIntersecting) {
    page++;
    console.log('Asdasdasd');
    const imageData = await fetchImage(searchInput.value, {}, page);
    updateGallery(imageData);
  }
});
