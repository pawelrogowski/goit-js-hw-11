// This script creates a simple image search app that retrieves image data from the Pixabay API.
// The imported libraries are used to make HTTP requests, create a lightbox effect for the images, and provide visual notifications to the user.
// When the user submits a search query or clicks the "Load More" button, the script fetches and displays the relevant images in the gallery element.
// The script also includes IntersectionObserver to implement pagination after load more button is clicked.

import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form__input');
const galleryElement = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const footerElement = document.querySelector('.footer');

let lastQuery = null;
let page = 1;
let totalPages = 0;

const lightbox = new SimpleLightbox('.gallery .gallery__item');
searchInput.focus();

// function to fetch image data from Pixabay API
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

    // Calculate total number of pages of search results
    totalPages = Math.ceil(response.data.totalHits / 40);

    // Display notification acording to the state of reposne
    if (response.data.totalHits === 0) {
      Notify.failure(`Sorry, there are no images matching your search query. Please try again.`, {
        position: 'right-top',
      });
    } else if (page === 1) {
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`, {
        position: 'right-top',
      });
    }

    return response.data.hits;
  } catch (error) {
    console.log(error);
  }
}

// function to update gallery with fetched image data
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

  if (page === 1 && totalPages !== 0) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
}

// IntersectionObserver to detect when user scrolls to bottom of page
const footerObserver = new IntersectionObserver(async function (entries, observer) {
  if (entries[0].isIntersecting === false) return;
  if (page >= totalPages) {
    Notify.info("You've reached the end of search results", {
      position: 'right-bottom',
    });
    return;
  }
  page += 1;
  const imageData = await fetchImage(lastQuery, {}, page);
  updateGallery(imageData);
});

// Debounced search function
const debouncedSearch = debounce(async function () {
  const query = searchInput.value;

  if (query === lastQuery) {
    return;
  } else {
    galleryElement.innerHTML = '';
  }

  lastQuery = query;
  page = 1;

  const imageData = await fetchImage(query, {}, page);
  updateGallery(imageData);
}, 300);

// submit form event listener
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  debouncedSearch();
});
// load more button event listener
loadMoreButton.addEventListener('click', async function () {
  page += 1;
  const imageData = await fetchImage(lastQuery, {}, page);
  updateGallery(imageData);
  footerObserver.observe(footerElement);
});
