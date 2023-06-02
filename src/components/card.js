/*import { elementsCards, popupImage, popupInscription, cardElementTemplate } from './constants.js';
import { openPopupPhoto } from './modal.js';  
import { deleteCardServer, addCardLike, deleteCardLike } from './Api.js';*/

export default class Card {

  constructor(dataCard, dataUser, api, templateSelector, handleCardClick) { 
    this._titlePhoto = dataCard.name;
    this._imagePhoto = dataCard.link;
    this._cardLikesArr = dataCard.likes;
    this._cardId = dataCard._id;
    this._cardAddUserId = dataCard.owner._id;
    this._userId = dataUser._id;
    this._api = api;
    this._selector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

    // функция, задающая активное состояние значка лайка при первичной загрузке карточек
  _displayLike(cardElement) {
    this._cardLikesArr.forEach((item) => {  
      if (item._id === this._userId) {
        cardElement.querySelector('.element__card-like').classList.add('element__card-like_active');
      }
    });
  }


    // функция, обеспечивающая выставление / удаление лайка
  _changeLike(e, cardElement, cardId) {   
    const like = cardElement.querySelector('.element__card-like').classList.contains('element__card-like_active');
    if (!like) {
      this._api.addCardLike(cardId)
        .then((data) => {
          e.target.classList.add('element__card-like_active');
          cardElement.querySelector('.element__card-number').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })  
    } else {
      this._api.deleteCardLike(cardId)
        .then((data) => {
          e.target.classList.remove('element__card-like_active');
          cardElement.querySelector('.element__card-number').textContent = data.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })  
    }
  };

    // функция, которая удаляет карточку со страницы
  _deleteCard(cardElement, cardId) {
    this._api.deleteCardServer(cardId)
    .then(() => {
      cardElement.closest('.element').remove();
    })
    .catch((err) => {
      console.log(err);
    })   
  };

  generate() {
    this._element = this._getElement();
    this._element.querySelector('.element__card-photo').src = this._imagePhoto;
    this._element.querySelector('.element__card-name').textContent = this._titlePhoto;
    this._displayLike(/*this._cardLikesArr, */this._element/*, this._userId*/);
    this._element.querySelector('.element__card-number').textContent = this._cardLikesArr.length;
    
    if (this._cardAddUserId === this._userId) {
      this._element.querySelector('.element__card-trash').classList.add('element__card-trash_active');
      this._element.querySelector('.element__card-trash').addEventListener('click', () => this._deleteCard(this._element, this._cardId));
    }

    this._element.querySelector('.element__card-like').addEventListener('click', (event) => this._changeLike(event, this._element, this._cardId));
    this._element.querySelector('.element__card-photo').addEventListener('click', () => { 
      this._handleCardClick(this._imagePhoto, this._titlePhoto)});
    return this._element;
  } 




}







/* функция, которая создаёт карточку */  
/*export function createCard(dataCard, dataUser) {
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
/*export function addCard(functionCreateElement) {
  elementsCards.prepend(functionCreateElement);
};

  

  */