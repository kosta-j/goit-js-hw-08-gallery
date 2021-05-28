// Задание
// Создай галерею с возможностью клика по ее элементам
// и просмотра полноразмерного изображения в модальном окне.

// Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных и предоставленному шаблону. +
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения. +
// Открытие модального окна по клику на элементе галереи. +
// Подмена значения атрибута src элемента img.lightbox__image. +
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. +
// Очистка значения атрибута src элемента img.lightbox__image.+
// Это необходимо для того, чтобы при следующем открытии модального окна,
// пока грузится изображение, мы не видели предыдущее.
'use strict';
import images from './gallery-items.js';

// elements parsing
const galleryRef = document.querySelector('.js-gallery');
const galleryModalWindowRef = document.querySelector('.js-lightbox');
const galleryModalWindowImageRef = document.querySelector(
  'img.lightbox__image',
);
const modalWindowCloseBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);
const modalOverlayRef = document.querySelector('.lightbox__overlay');

// markup creating
const makeGalleryMarkup = ({ preview, original, description }) => {
  // href="${original}"
  return `
  <li class="gallery__item">
  <a
      class="gallery__link"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
};

// markup rendering
const makeGallery = images.map(makeGalleryMarkup).join('');
galleryRef.insertAdjacentHTML('beforeend', makeGallery);

// array of image original URLs
const arrayImages = images.map(image => image.original);

// listeners adding
galleryRef.addEventListener('click', onGalleryImageClick);
modalWindowCloseBtnRef.addEventListener('click', onModalWindowCloseBtnClick);
modalOverlayRef.addEventListener('click', onModalWindowCloseBtnClick);
document.addEventListener('keydown', onKeydown);

// callback functions:

function onGalleryImageClick(event) {
  const originalImageUrl = event.target.dataset.source;
  const imageDescription = event.target.alt;

  galleryModalWindowImageRef.src = originalImageUrl;
  galleryModalWindowImageRef.alt = imageDescription;

  galleryModalWindowRef.classList.add('is-open');
}

// common function for all modal close events
function onModalWindowCloseBtnClick() {
  galleryModalWindowRef.classList.remove('is-open');
  galleryModalWindowImageRef.src = '';
}

function onKeydown(event) {
  if (!galleryModalWindowRef.className.includes('is-open')) {
    return;
  }

  // Escape key
  if (event.key === 'Escape') {
    onModalWindowCloseBtnClick();
    return;
  }

  // Arrow keys
  let newID;
  const currentID = arrayImages.indexOf(galleryModalWindowImageRef.src);

  if (event.key === 'ArrowLeft') {
    newID = currentID - 1;
    if (newID === -1) {
      newID = arrayImages.length - 1;
    }
  }

  if (event.key === 'ArrowRight') {
    newID = currentID + 1;
    if (newID === arrayImages.length) {
      newID = 0;
    }
  }

  galleryModalWindowImageRef.src = arrayImages[newID];
}
