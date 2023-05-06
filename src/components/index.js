import '../pages/index.css';

import { validation, page, popupEditProfile, popupAddCard, popupPhoto, popupEditAvatar, profile, profileButtonEdit, profileButtonAdd, profileButtonAvatar, 
  profileUserName, profileUserProfession, profileUserPhoto, formUser, userNameForm, userProfForm, formLocation, locPlaceForm, locLinkForm, formAvatar, 
  avaLinkForm, popupCloseButtonEdit, popupCloseButtonAdd, popupCloseButtonPhoto, popupCloseButtonAvatar, elements, elementsCards, popupImage, 
  popupInscription, cardElementTemplate, popupSaveButtonEdit, popupSaveButtonAdd, popupSaveButtonAvatar, profilePhoto } from './constants.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, hideFormError, disabledButtonSave } from './validate.js';
import { createCard, addCard } from './card.js';
import { getUserInfo, getCards, editProfileServer, addNewCard, editAvatarProfile } from './api.js';
 
let user = {};

  /* задаём функцию открытия popup-edit, её срабатывание при клике на кнопку edit в профиле 
  и предачу в поля формы edit текущих значений из профиля */
export function openPopupEdit() { 
  userNameForm.value = profileUserName.textContent; 
  userProfForm.value = profileUserProfession.textContent;
  openPopup(popupEditProfile);
  disabledButtonSave(popupSaveButtonEdit, validation);
};
profileButtonEdit.addEventListener('click', openPopupEdit);

  /* задаём функцию открытия popup-add и срабатывание при клике на кнопку add в профиле */
export function openPopupAdd() {
  locPlaceForm.value = ""; 
  locLinkForm.value = "";
  openPopup(popupAddCard);
  disabledButtonSave(popupSaveButtonAdd, validation);
};
profileButtonAdd.addEventListener('click', openPopupAdd);

  /* задаём функцию открытия popup-avatar и срабатывание при клике на кнопку avatar в профиле */
export function openPopupAvatar() {
  avaLinkForm.value = ""; 
  openPopup(popupEditAvatar);
 disabledButtonSave(popupSaveButtonAvatar, validation);
};
profileButtonAvatar.addEventListener('click', openPopupAvatar);

/* получаем с сервера сохранённую информацию о пользователе и текущий набор карточек */
const promises = [getUserInfo(), getCards()];
Promise.all(promises)
  .then(([userInfo, cardsInfo]) => {
    user = userInfo;
    profileUserName.textContent = user.name;
    profileUserProfession.textContent = user.about;
    profileUserPhoto.src = user.avatar;
    /* создаём карточки, используя элементы массива как аргументы для функции, создающей карточку,
   добавляем карточку на страницу и задаём ей доп.возможности через слушателей событий */
    cardsInfo.forEach((item) => {
      const createCardBasis = createCard(item, user); 
      addCard(createCardBasis);     
    });
  }); 
  
  /* задаём функцию закрытия popup-edit и срабатывание при клике на крестик-edit */ 
export function closePopupEdit() { 
  closePopup(popupEditProfile);
  hideFormError(popupEditProfile, validation);
};
popupCloseButtonEdit.addEventListener('click', closePopupEdit);

  /* задаём функцию, которая будет отправлять данные, введённые пользователем в форму edit, на сервер 
   и передавать их в профиль, запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-edit */
export function submitEditProfileForm(event) {
  event.preventDefault();
  popupSaveButtonEdit.textContent = "Сохранение...";
  editProfileServer(userNameForm.value, userProfForm.value)
    .then(() => {
      profileUserName.textContent = userNameForm.value;
      profileUserProfession.textContent = userProfForm.value;
      closePopupEdit();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupSaveButtonEdit.textContent = "Сохранить";
    });
  };
formUser.addEventListener('submit', submitEditProfileForm);

  /* задаём функцию закрытия popup-add и срабатывание при клике на крестик-add */  
export function closePopupAdd() { 
  closePopup(popupAddCard);
  hideFormError(popupAddCard, validation);
};
popupCloseButtonAdd.addEventListener('click', closePopupAdd);

  /* задаём функцию, которая будет отправлять данные, введённые пользователем в форму add, на сервер и создавать 
   новую карточку c доп.возможностями, запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-add */
export function submitAddCardForm(event) {
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
export function closePopupAvatar() { 
  closePopup(popupEditAvatar);
  hideFormError(popupEditAvatar, validation);
};
popupCloseButtonAvatar.addEventListener('click', closePopupAvatar);

  /* задаём функцию, которая будет отправлять данные, введённые пользователем в форму avatar, на сервер изменять фото  профиля, 
  запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-avatar */
export function submitChangeAvatarForm(event) {
  event.preventDefault();
  popupSaveButtonAvatar.textContent = "Сохранение...";
  editAvatarProfile(avaLinkForm.value)
  .then(() => {
    profilePhoto.src = avaLinkForm.value;
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
enableValidation(validation);