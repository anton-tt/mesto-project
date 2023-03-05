import { initialCards, validation, page, popupEditProfile, popupAddCard, popupPhoto, profile, profileButtonEdit, profileButtonAdd, profileUserName, profileUserProfession,
    formUser, userNameForm, userProfForm, formLocation, locPlaceForm, locLinkForm, popupCloseButtonEdit, popupCloseButtonAdd, popupCloseButtonPhoto, elements, elementsCards, 
    popupImage, popupInscription, cardElementTemplate } from './constants.js';

    import { openPopupEdit, openPopupAdd/*, openPopupPhoto*/, /*changeLike, deleteCard, createCard, addCard*/ closePopupEdit, editInfoProfile,
        submitEditProfileForm, closePopupAdd, submitAddCardForm/*, closePopupPhoto*/ } from './index.js';  

        import {  openPopup, closePopup, openPopupPhoto, closePopupPhoto} from './modal.js';  

/* функция с двумя параметрами - имя карточки и ссылка на фото, которая создаёт карточку */  
export function createCard(titlePhoto, imagePhoto) {
    const cardElement = cardElementTemplate.querySelector('.element').cloneNode(true);
    const cardElementName = cardElement.querySelector('.element__card-name');
    const cardElementImage = cardElement.querySelector('.element__card-photo');
    const cardElementLike = cardElement.querySelector('.element__card-like');
    const cardElementTrash = cardElement.querySelector('.element__card-trash');
    cardElementName.textContent = titlePhoto;  
    cardElementImage.src = imagePhoto;   
    cardElementLike.addEventListener('click', function() {
      changeLike(cardElementLike)
    });
    cardElementTrash.addEventListener('click', function() {
      deleteCard(cardElementTrash)
    });
    cardElementImage.addEventListener('click', function() {
      popupInscription.textContent = titlePhoto;
      popupImage.src = imagePhoto;
      popupImage.alt = "Фотография места";
      openPopupPhoto();
    });
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