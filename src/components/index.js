import '../pages/index.css';

import { initialCards, validation, page, popupEditProfile, popupAddCard, popupPhoto, profile, profileButtonEdit, profileButtonAdd, profileUserName, profileUserProfession,
   formUser, userNameForm, userProfForm, formLocation, locPlaceForm, locLinkForm, popupCloseButtonEdit, popupCloseButtonAdd, popupCloseButtonPhoto, elements, elementsCards, 
   popupImage, popupInscription, cardElementTemplate, popupSaveButtonEdit, popupSaveButtonAdd } from './constants.js';
import {  openPopup, closePopup } from './modal.js';
import { enableValidation, hideFormError, disabledButtonSave } from './validate.js';
import {  createCard, addCard }  from './card.js';
 
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

  /* создаём начальные карточки, используя элементы массива как аргументы для функции, создающей карточку,
   добавляем карточку на страницу и задаём ей доп.возможности через слушателей событий */
initialCards.forEach((item) => {
  const createCardBasis = createCard(item.name, item.link); 
  addCard(createCardBasis);     
});
  
  /* задаём функцию закрытия popup-edit и срабатывание при клике на крестик-edit */ 
export function closePopupEdit() { 
  closePopup(popupEditProfile);
  hideFormError(popupEditProfile, validation);
};
popupCloseButtonEdit.addEventListener('click', closePopupEdit);

  /* задаём функцию, которая заменит значения имени и профессии профиля данными из полей из формы edit */
export function editInfoProfile() { 
  profileUserName.textContent = userNameForm.value;
  profileUserProfession.textContent = userProfForm.value;
};

  /* задаём функцию, которая будет отправлять данные, введённые пользователем в форму edit, на сервер 
   и передавать их в профиль, запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-edit */
export function submitEditProfileForm(event) {
  event.preventDefault();
  editInfoProfile();
  closePopupEdit();
  
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
  const createCardNew = createCard(locPlaceForm.value, locLinkForm.value); 
  addCard(createCardNew);
  closePopupAdd();
};
formLocation.addEventListener('submit', submitAddCardForm)

  /* вызываем функцию, которая отвечает за валидацию форм*/
enableValidation(validation);