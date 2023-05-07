import { elementsCards, popupImage, popupInscription, cardElementTemplate } from './constants.js';
import { openPopupPhoto } from './modal.js';  
import { deleteCardServer, addCardLike, deleteCardLike } from './api.js';

/* функция, которая создаёт карточку */  
export function createCard(dataCard, dataUser) {
  const titlePhoto = dataCard.name;
  const imagePhoto = dataCard.link;
  const userId = dataUser._id;
  const cardAddUserId = dataCard.owner._id;
  const cardLikesArr = dataCard.likes;
  const cardLikesNumber = cardLikesArr.length;
  const cardId = dataCard._id;
  
  const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
  const cardElementName = cardElement.querySelector('.element__card-name');
  const cardElementImage = cardElement.querySelector('.element__card-photo');
  const cardElementLike = cardElement.querySelector('.element__card-like');
  const cardElementNumber = cardElement.querySelector('.element__card-number');
  const cardElementTrash = cardElement.querySelector('.element__card-trash');
  
  cardElementName.textContent = titlePhoto;  
  cardElementImage.src = imagePhoto;   
  cardElementNumber.textContent = cardLikesNumber;
  cardLikesArr.forEach((item) => {  
    if (item._id === userId) {
      cardElementLike.classList.add('element__card-like_active');
    }
  });
  cardElementLike.addEventListener('click', () => changeLike(cardId, cardElementLike, cardElementNumber));
  
  if (cardAddUserId === userId) {
    cardElementTrash.classList.add('element__card-trash_active');
    cardElementTrash.addEventListener('click', () => deleteCard(cardId, cardElementTrash));
  }
  
  const openPopupImage = (titlePhoto, imagePhoto) => {
    popupInscription.textContent = titlePhoto;
    popupImage.src = imagePhoto;
    popupImage.alt = "Фотография места";
    openPopupPhoto();
  };
  cardElementImage.addEventListener('click', () => openPopupImage(titlePhoto, imagePhoto));
  return cardElement;
};

  /* функция с параметром, которая берёт результат предыдущей функции и добавляет готовую карточку на страницу */
export function addCard(functionCreateElement) {
  elementsCards.prepend(functionCreateElement);
};

  /* функция, которая удаляет карточку со страницы*/
export function deleteCard(id, cardElement) {
  deleteCardServer(id)
    .then(() => {
      cardElement.closest('.element').remove();
    })
    .catch((err) => {
      console.log(err);
    })    
};

  /* функция, обеспечивающая выставление / удаление лайка */
export function changeLike(id, cardElement, cardElementNumber) {   
  const like = cardElement.classList.contains('element__card-like_active');
  if (!like) {
    addCardLike(id)
      .then((data) => {
        cardElement.classList.add('element__card-like_active');
        cardElementNumber.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })  
  } else {
    deleteCardLike(id)
      .then((data) => {
        cardElement.classList.remove('element__card-like_active');
        cardElementNumber.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })  
  }
};