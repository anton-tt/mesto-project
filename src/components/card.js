import { elementsCards, popupImage, popupInscription, cardElementTemplate } from './constants.js';
import { openPopupPhoto } from './modal.js';  

/* функция с двумя параметрами - имя карточки и ссылка на фото, которая создаёт карточку */  
export function createCard(titlePhoto, imagePhoto) {
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  const cardElementName = cardElement.querySelector('.element__card-name');
  const cardElementImage = cardElement.querySelector('.element__card-photo');
  const cardElementLike = cardElement.querySelector('.element__card-like');
  const cardElementTrash = cardElement.querySelector('.element__card-trash');
  cardElementName.textContent = titlePhoto;  
  cardElementImage.src = imagePhoto;   
  cardElementLike.addEventListener('click', () => changeLike(cardElementLike));
  cardElementTrash.addEventListener('click', () => deleteCard(cardElementTrash));
  
  const openPopupImage = (titlePhoto, imagePhoto) => {
    popupInscription.textContent = titlePhoto;
    popupImage.src = imagePhoto;
    popupImage.alt = "Фотография места";
    openPopupPhoto();
  };
  cardElementImage.addEventListener('click', () => openPopupImage(titlePhoto, imagePhoto));
  return cardElement;
};

  /* функция с параметром, которая берёт предыдущую функцию и добавляет карточку на страницу */
export function addCard(functionCreateElement) {
  elementsCards.prepend(functionCreateElement);
};

  /* функция, меняющая состояние лайка на противоположное */
export function changeLike(cardElement) {    
  cardElement.classList.toggle('element__card-like_active');
};
  /* функция, которая удаляет карточку со страницы*/
export function deleteCard(cardElement) {    
  cardElement.closest('.element').remove();
};