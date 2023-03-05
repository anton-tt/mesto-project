export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
 {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__info_input_error',
  errorClass: 'popup__errorInput_active'
};

const page = document.querySelector('.page');

/* задаём переменные для обращения к необходимым popup */
const popupEditProfile = page.querySelector('.popup_edit');
const popupAddCard = page.querySelector('.popup_add');
const popupPhoto = page.querySelector('.popup_photo');

/* задаём переменные для обращения к кнопкам edit и add в профиле*/
const profile = page.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonAdd = profile.querySelector('.profile__button-add');

/* задаём переменные, для обращения к значениям имя и профессия в профиле */ 
const profileUserName = profile.querySelector('.profile__user-name');
const profileUserProfession = profile.querySelector('.profile__user-profession');

/* задаём переменные, для обращения к форме и через неё к полям редактирования профиля */
const formUser = document.forms.user;
const userNameForm = formUser.elements.username;
const userProfForm = formUser.elements.userprof;

 /* задаём переменные, для обращения к форме и через неё к полям добавления карточки */
 const formLocation = document.forms.location;
 const locPlaceForm = formLocation.elements.locplace;
 const locLinkForm = formLocation.elements.loclink;
 
 /* задаём переменные для обращения к "крестикам" в разных popup*/
const popupCloseButtonEdit = popupEditProfile.querySelector('.popup__close-button_edit');
const popupCloseButtonAdd = popupAddCard.querySelector('.popup__close-button_add');
const popupCloseButtonPhoto = popupPhoto.querySelector('.popup__close-button_photo');

export { page, popupEditProfile, popupAddCard, popupPhoto, profile, profileButtonEdit, profileButtonAdd, profileUserName, profileUserProfession, 
  formUser, userNameForm, userProfForm, formLocation, locPlaceForm, locLinkForm, popupCloseButtonEdit, popupCloseButtonAdd, popupCloseButtonPhoto };