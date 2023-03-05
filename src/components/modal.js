import { initialCards, validation, page, popupEditProfile, popupAddCard, popupPhoto, profile, profileButtonEdit, profileButtonAdd, profileUserName, profileUserProfession,
  formUser, userNameForm, userProfForm, formLocation, locPlaceForm, locLinkForm, popupCloseButtonEdit, popupCloseButtonAdd, popupCloseButtonPhoto, elements, elementsCards, 
  popupImage, popupInscription, cardElementTemplate } from './constants.js';
  import {  createCard, addCard, changeLike, deleteCard }  from './card.js';
  /*import { openPopupEdit, openPopupAdd, openPopupPhoto, changeLike, deleteCard, createCard, addCard, closePopupEdit, editInfoProfile,
    submitEditProfileForm, closePopupAdd, submitAddCardForm, closePopupPhoto } from './index.js';  */
  
    /*import { changeLike, deleteCard, createCard }  from './card.js';*/
  

  /* задаём функцию - при клике на "тёмный фон" закрывается любой открытый popup */
export function closePopupClick(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
};
  
  /* задаём функцию - при срабатывании клавиши Esc закрывается любой открытый popup */
export function closePopupEscape (event) {
  const popupOpened = page.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popupOpened);
  }
};

  /* задаём функции, которые открывают - закрывают целевой popup и подключают -отключают слушателей событий на закрытие */ 
export function openPopup(popup) { 
  popup.classList.add('popup_opened');
  page.addEventListener('click', closePopupClick);
  page.addEventListener('keyup', closePopupEscape); 
};

export function closePopup(popup) { 
  popup.classList.remove('popup_opened');
  page.removeEventListener('click', closePopupClick);
  page.removeEventListener('keyup', closePopupEscape); 
}; 

/* задаём  функцию открытия popup-photo */
export function openPopupPhoto() { 
  openPopup(popupPhoto);
};

/* задаём функцию закрытия popup-photo и срабатывание при клике на крестик-photo */ 
export function closePopupPhoto() { 
  closePopup(popupPhoto);
};
popupCloseButtonPhoto.addEventListener('click', closePopupPhoto);