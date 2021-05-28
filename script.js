// Задание
// Создай галерею с возможностью клика по ее элементам
// и просмотра полноразмерного изображения в модальном окне.

// Разбей задание на несколько подзадач:
// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
// пока грузится изображение, мы не видели предыдущее.
'use strict';
import images from './gallery-items.js';

// elements parsing
const galleryRef = document.querySelector('.js-gallery');
const galleryModalWindowRef = document.querySelector('.js-lightbox');
const galleryModalWindowImageRef = document.querySelector('.lightbox__image');

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

// listener adding
galleryRef.addEventListener('click', onGalleryImageClick);

function onGalleryImageClick(event) {
  const originalImageUrl = event.target.dataset.source;
  const imageDescription = event.target.getAttribute('alt');

  galleryModalWindowImageRef.setAttribute('src', originalImageUrl);
  galleryModalWindowImageRef.setAttribute('alt', imageDescription);

  galleryModalWindowRef.classList.add('is-open');

  // console.log(event.target.attributes);
}
