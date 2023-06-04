export const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__info_input_error',
  errorClass: 'popup__errorInput_active'
};

export const apiId = {
  urlBase: 'https://nomoreparties.co/v1/plus-cohort-23/',
  headers: {
      authorization: 'e1af8fdb-dc43-4ad1-80c1-f523f688a620',
      'Content-Type': 'application/json'
  }
}

export const userSelectors = {
  selectorName: '.profile__user-name',
  selectorProfession: '.profile__user-profession',
  selectorAvatar: '.profile__photo'
}

export const page = document.querySelector('.page');

  /* задаём переменные для обращения к кнопкам edit, add и avatar в профиле*/
const profile = page.querySelector('.profile');
export const profileButtonEdit = profile.querySelector('.profile__button-edit');
export const profileButtonAdd = profile.querySelector('.profile__button-add');
export const profileButtonAvatar = profile.querySelector('.profile__avatar');
  
  /* переменные для обращения к кнопкам форм */
export const popupSaveButtonEdit = page.querySelector('.popup__button-save_edit');
export const popupSaveButtonAdd = page.querySelector('.popup__button-save_add');
export const popupSaveButtonAvatar = page.querySelector('.popup__button-save_avatar');





/* задаём переменные для обращения к необходимым popup */
/*const popupEditProfile = page.querySelector('.popup_edit');
const popupAddCard = page.querySelector('.popup_add');
const popupPhoto = page.querySelector('.popup_photo');
const popupEditAvatar = page.querySelector('.popup_avatar');

/* задаём переменные для обращения к кнопкам edit, add и avatar в профиле*/
/*const profile = page.querySelector('.profile');
const profileButtonEdit = profile.querySelector('.profile__button-edit');
const profileButtonAdd = profile.querySelector('.profile__button-add');
const profileButtonAvatar = profile.querySelector('.profile__avatar');

/* задаём переменные, для обращения к значениям имя, профессия и фото в профиле */ 
/*const profileUserName = profile.querySelector('.profile__user-name');
const profileUserProfession = profile.querySelector('.profile__user-profession');
const profileUserPhoto = profile.querySelector('.profile__photo');

/* задаём переменные, для обращения к форме и через неё к полям редактирования профиля */
/*const formUser = document.forms.user;
const userNameForm = formUser.elements.username;
const userProfForm = formUser.elements.userprof;

 /* задаём переменные, для обращения к форме и через неё к полям добавления карточки */
 /*const formLocation = document.forms.location;
 const locPlaceForm = formLocation.elements.locplace;
 const locLinkForm = formLocation.elements.loclink;

 /* задаём переменные, для обращения к форме и через неё к полю редактирования аватара */
 /*const formAvatar = document.forms.avatar;
 const avaLinkForm = formAvatar.elements.avalink;

 /* задаём переменную для обращения к фотографии профиля */
 /*const profilePhoto = profile.querySelector('.profile__photo');
 
 /* задаём переменные для обращения к "крестикам" в разных popup*/
/*const popupCloseButtonEdit = popupEditProfile.querySelector('.popup__close-button_edit');
const popupCloseButtonAdd = popupAddCard.querySelector('.popup__close-button_add');
const popupCloseButtonPhoto = popupPhoto.querySelector('.popup__close-button_photo');
const popupCloseButtonAvatar = popupEditAvatar.querySelector('.popup__close-button_avatar');

/* задаём переменную для обращения к блоку, в который внесём карточки */
/*const elements = page.querySelector('.elements'); /* секция, в которой будем искать элементы */
/*const elementsCards = elements.querySelector('.elements__cards');
/* переменные для фото и подписи всплывающего окна с фотографией */
/*const popupImage = popupPhoto.querySelector('.popup__image');
const popupInscription = popupPhoto.querySelector('.popup__inscription');
/* переменные для формирования карточек */
/*const cardElementTemplate = page.querySelector('#card-element').content; 

/* переменные для обращения к кнопкам форм */
/*const popupSaveButtonEdit = page.querySelector('.popup__button-save_edit');
const popupSaveButtonAdd = page.querySelector('.popup__button-save_add');
const popupSaveButtonAvatar = page.querySelector('.popup__button-save_avatar');

export { page, popupEditProfile, popupAddCard, popupPhoto, popupEditAvatar, profile, profileButtonEdit, profileButtonAdd, profileButtonAvatar, 
  profileUserName, profileUserProfession, profileUserPhoto, formUser, userNameForm, userProfForm, formLocation, locPlaceForm, locLinkForm, 
  formAvatar, avaLinkForm, profilePhoto, popupCloseButtonEdit, popupCloseButtonAdd, popupCloseButtonPhoto, popupCloseButtonAvatar, elements, 
  elementsCards, popupImage, popupInscription, cardElementTemplate, popupSaveButtonEdit, popupSaveButtonAdd, popupSaveButtonAvatar };

  /*export const initialCards = [
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
];*/