/*import '../pages/index.css';

import { validation, page, popupEditProfile, popupAddCard, popupPhoto, popupEditAvatar, profile, profileButtonEdit, profileButtonAdd, profileButtonAvatar, 
  profileUserName, profileUserProfession, profileUserPhoto, formUser, userNameForm, userProfForm, formLocation, locPlaceForm, locLinkForm, formAvatar, 
  avaLinkForm, popupCloseButtonEdit, popupCloseButtonAdd, popupCloseButtonPhoto, popupCloseButtonAvatar, elements, elementsCards, popupImage, 
  popupInscription, cardElementTemplate, popupSaveButtonEdit, popupSaveButtonAdd, popupSaveButtonAvatar, profilePhoto } from '../utils/constants.js';
import { openPopup, closePopup } from '../components/modal.js';
import { enableValidation, hideFormError, disabledButtonSave } from '../components/validate.js';
//import { createCard, addCard } from './Card.js';
//import { getUserInfo, getCards, editProfileServer, addNewCard, editAvatarProfile } from './Api.js';
*/


import './index.css';
import Api from '../components/Api.js';

import Card from '../components/Card.js';
//import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { apiId, userSelectors, validation, profileButtonEdit, profileButtonAdd, profileButtonAvatar, 
  popupSaveButtonEdit, popupSaveButtonAdd, popupSaveButtonAvatar } from '../utils/constants.js';
//import { submitEditProfileForm } from '../utils/utils.js';

const api = new Api(apiId);

const userInfo = new UserInfo(userSelectors);

let user = {};
const section = new Section((dataCard, dataUser) => {return createCard (dataCard, dataUser);}, '.elements__cards');
const popupWithImage = new PopupWithImage('.popup_photo');    
const handleCardClick = (cardPhoto, cardTitle) => {
  popupWithImage.open(cardPhoto, cardTitle);
}

const createCard = (dataCard, dataUser) => {
  const cardNew = new Card(dataCard, dataUser, api, '.card-template_type_default', handleCardClick);
  return cardNew.generate();
}

const promises = [api.getUserInfo(), api.getCards()];
Promise.all(promises)
  .then(([userData, cardsData]) => {
    user = userData;    
    userInfo.setUserInfo(user);
    
    //const section = new Section((dataCard, dataUser) => {return createCard (dataCard, dataUser);}, '.elements__cards');
    section.pictureAllItems(cardsData, user);
  })
  .catch((err) => {
      console.log(err);
    });   





const popupEditProfile = new PopupWithForm('.popup_edit', (valuesForm) => { submitEditProfileForm(valuesForm) });
const formEditProfileValidator = new FormValidator(validation, document.forms.user);
formEditProfileValidator.enableValidation();
function submitEditProfileForm(valuesForm) {
  popupEditProfile.setTitleButtonSave("Сохранение...");
  api.editProfileServer(valuesForm)
    .then((dataUser) => {
      userInfo.setUserInfo(dataUser);
      popupEditProfile.close();
      
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.setTitleButtonSave("Сохранить");
    });
}
profileButtonEdit.addEventListener('click', (event) => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formEditProfileValidator.hideFormError();
  formEditProfileValidator.disabledButtonSave(popupSaveButtonEdit);
});
 
const popupAddCard = new PopupWithForm('.popup_add', (valuesForm) => { submitAddCardForm(valuesForm) });
const formAddCardValidator = new FormValidator(validation, document.forms.location);
formAddCardValidator.enableValidation();
function submitAddCardForm (valuesForm) {
  popupAddCard.setTitleButtonSave("Сохранение...");
  api.addNewCard(valuesForm)
    .then((dataCard) => {  
      section.pictureItem(dataCard, user);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.setTitleButtonSave("Сохранить");
    }); 
}
profileButtonAdd.addEventListener('click', (event) => {
  popupAddCard.open();
  formAddCardValidator.hideFormError();
  formAddCardValidator.disabledButtonSave(popupSaveButtonAdd);
});

const popupEditAvatar = new PopupWithForm('.popup_avatar', (valuesForm) => { submitEditAvatarForm(valuesForm) });
const formEditAvatarValidator = new FormValidator(validation, document.forms.avatar);
formEditAvatarValidator.enableValidation();
function submitEditAvatarForm(valuesForm) {
  popupEditAvatar.setTitleButtonSave("Сохранение...");
  api.editAvatarProfile(valuesForm)
    .then((dataUser) => {
      userInfo.setUserInfo(dataUser);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.setTitleButtonSave("Сохранить");
    }); 
}
profileButtonAvatar.addEventListener('click', (event) => {
  popupEditAvatar.open();
  formEditAvatarValidator.hideFormError();
  formEditAvatarValidator.disabledButtonSave(popupSaveButtonAvatar);
});




/*const section = new Section({cards: cardsData,
  renderer: (dataCard, user) => {createCard(dataCard, user)}
}, '.elements__cards');

/*const promises = [getUserInfo(), getCards()];
Promise.all(promises)
  .then(([userInfo, cardsInfo]) => {
    user = userInfo;
    profileUserName.textContent = user.name;
    profileUserProfession.textContent = user.about;
    profileUserPhoto.src = user.avatar;
    /* создаём карточки, используя элементы массива как аргументы для функции, создающей карточку,
   добавляем карточку на страницу и задаём ей доп.возможности через слушателей событий */
  /*  cardsInfo.forEach((item) => {
      const createCardBasis = createCard(item, user); 
      addCard(createCardBasis);     
    })
  .catch((err) => {
      console.log(err);
    })  
  }); */

  //const card = new Card(dataCard, user, api, '.card-template_type_default'/*, handleCardClick*/);








  /* задаём функцию открытия popup-edit, её срабатывание при клике на кнопку edit в профиле 
  и предачу в поля формы edit текущих значений из профиля */
/*export function openPopupEdit() { 
  userNameForm.value = profileUserName.textContent; 
  userProfForm.value = profileUserProfession.textContent;
  openPopup(popupEditProfile);
  disabledButtonSave(popupSaveButtonEdit, validation);
};
profileButtonEdit.addEventListener('click', openPopupEdit);

  /* задаём функцию открытия popup-add и срабатывание при клике на кнопку add в профиле */
/*export function openPopupAdd() {
  locPlaceForm.value = ""; 
  locLinkForm.value = "";
  openPopup(popupAddCard);
  disabledButtonSave(popupSaveButtonAdd, validation);
};
profileButtonAdd.addEventListener('click', openPopupAdd);

  /* задаём функцию открытия popup-avatar и срабатывание при клике на кнопку avatar в профиле */
/*export function openPopupAvatar() {
  avaLinkForm.value = ""; 
  openPopup(popupEditAvatar);
 disabledButtonSave(popupSaveButtonAvatar, validation);
};
profileButtonAvatar.addEventListener('click', openPopupAvatar);

/* получаем с сервера сохранённую информацию о пользователе и текущий набор карточек */

  
  /* задаём функцию закрытия popup-edit и срабатывание при клике на крестик-edit */ 
/*export function closePopupEdit() { 
  closePopup(popupEditProfile);
  hideFormError(popupEditProfile, validation);
};
popupCloseButtonEdit.addEventListener('click', closePopupEdit);

  

  /* задаём функцию закрытия popup-add и срабатывание при клике на крестик-add */  
/*export function closePopupAdd() { 
  closePopup(popupAddCard);
  hideFormError(popupAddCard, validation);
};
popupCloseButtonAdd.addEventListener('click', closePopupAdd);

  /* задаём функцию, которая будет отправлять данные, введённые пользователем в форму add, на сервер и создавать 
   новую карточку c доп.возможностями, запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-add */
/*export function submitAddCardForm(event) {
  event.preventDefault();
  popupSaveButtonAdd.textContent = "Сохранение...";
  addNewCard(locPlaceForm.value, locLinkForm.value)
    .then((data) => {
      const createCardNew = createCard(data, user); 
      addCard(createCardNew);
      closePopupAdd();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupSaveButtonAdd.textContent = "Сохранить";
    }); 
};
formLocation.addEventListener('submit', submitAddCardForm);

  /* задаём функцию закрытия popup-avatar и срабатывание при клике на крестик-avatar */ 
/*export function closePopupAvatar() { 
  closePopup(popupEditAvatar);
  hideFormError(popupEditAvatar, validation);
};
popupCloseButtonAvatar.addEventListener('click', closePopupAvatar);

  /* задаём функцию, которая будет отправлять данные, введённые пользователем в форму avatar, на сервер изменять фото  профиля, 
  запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-avatar */
/*export function submitChangeAvatarForm(event) {
  event.preventDefault();
  popupSaveButtonAvatar.textContent = "Сохранение...";
  editAvatarProfile(avaLinkForm.value)
  .then((user) => {
    profilePhoto.src = user.avatar;
    closePopupAvatar();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupSaveButtonAvatar.textContent = "Сохранить";
  }); 
};
formAvatar.addEventListener('submit', submitChangeAvatarForm);

  /* вызываем функцию, которая отвечает за валидацию форм*/
/*enableValidation(validation);*/