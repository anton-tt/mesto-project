//import '../pages/index.css';
import { initialCards, validation, page, popupEditProfile, popupAddCard, popupPhoto, profile, profileButtonEdit, profileButtonAdd, profileUserName, profileUserProfession,
   formUser, userNameForm, userProfForm, formLocation, locPlaceForm, locLinkForm, popupCloseButtonEdit, popupCloseButtonAdd, popupCloseButtonPhoto
   } from './constants.js';

import {  openPopup, closePopup} from './modal.js';
import { enableValidation } from './validate.js';
//import {addCard}  from './card';
 


/* задаём переменные для обращения к кнопкам Сохранить-edit и Сохранить-add в popup*/
//const popupButtonSaveEdit = popupEditProfile.querySelector('.popup__button-save_edit');  
//const popupButtonSaveAdd = popupAddCard.querySelector('.popup__button-save_add');



/* задаём функцию открытия popup-edit, её срабатывание при клике на кнопку edit в профиле 
и предачу в поля формы edit текущих значений из профиля */
function openPopupEdit() { 
  openPopup(popupEditProfile);
};
profileButtonEdit.addEventListener('click', function() { 
  userNameForm.value = profileUserName.textContent; 
  userProfForm.value = profileUserProfession.textContent;
  openPopupEdit();  
});

/* задаём функцию открытия popup-add и срабатывание при клике на кнопку add в профиле */
function openPopupAdd() { 
  openPopup(popupAddCard);
};
profileButtonAdd.addEventListener('click', openPopupAdd);

/* задаём  функцию открытия popup-photo */
export function openPopupPhoto() { 
  openPopup(popupPhoto);
};




/* задаём переменную для обращения к блоку, в который внесём карточки */
const elements = page.querySelector('.elements'); /* секция, в которой будем искать элементы */
const elementsCards = elements.querySelector('.elements__cards');
/* переменные для фото и подписи всплывающего окна с фотографией */
const popupImage = popupPhoto.querySelector('.popup__image');
const popupInscription = popupPhoto.querySelector('.popup__inscription');
/* переменные для формирования карточек */
const cardElementTemplate = page.querySelector('#card-element').content; 

/* функция, меняющая состояние лайка на противоположное */
function changeLike(cardElement) {    
  cardElement.classList.toggle('element__card-like_active');
};

/* функция, которая удаляет карточку со страницы*/
function deleteCard(cardElement) {    
  cardElement.closest('.element').remove();
};

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
  
  

/* создаём начальные карточки, используя элементы массива как аргументы для функции, создающей карточку,
добавляем карточку на страницу и задаём ей доп.возможности через слушателей событий */
initialCards.forEach((item) => {
  const createCardBasis = createCard(item.name, item.link); 
  addCard(createCardBasis);     
});


/* функция с параметром, которая берёт предыдущую функцию и добавляет карточку на страницу */
export function addCard(functionCreateElement) {
  elementsCards.prepend(functionCreateElement);
};

 

  
/* задаём функцию закрытия popup-edit */ 
function closePopupEdit() { 
  closePopup(popupEditProfile);
};

/* задаём функцию, которая заменит значения имени и профессии профиля данными из полей из формы edit */
function editInfoProfile() { 
  profileUserName.textContent = userNameForm.value;
  profileUserProfession.textContent = userProfForm.value;
};

const popupBox = popupEditProfile.querySelector('.popup__box');

/* задаём действия - при клике на крестик-edit закрывается popup-edit */ 
popupCloseButtonEdit.addEventListener('click', closePopupEdit);


/* задаём функцию, которая будет отправлять данные, введённые пользователем в форму edit, на сервер 
и передавать их в профиль, запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-edit */
function submitEditProfileForm(event) {
  event.preventDefault();
  editInfoProfile();
  closePopupEdit();
};
formUser.addEventListener('submit', submitEditProfileForm);
/*popupButtonSaveEdit.addEventListener('click', function() {
  submitEditProfileForm();
});
function() {
  submitEditProfileForm();
}

*/

/* задаём функцию закрытия popup-add и срабатывание при клике на крестик-add */  
function closePopupAdd() { 
  closePopup(popupAddCard);
};
popupCloseButtonAdd.addEventListener('click', closePopupAdd);

/* задаём функцию, которая будет отправлять данные, введённые пользователем в форму add, на сервер и создавать 
новую карточку c доп.возможностями, запускается через слушателя событий submit для формы и при клике на кнопку Сохранить-add */
function submitAddCardForm(event) {
  event.preventDefault();
  const createCardNew = createCard(locPlaceForm.value, locLinkForm.value); 
  addCard(createCardNew);
  closePopupAdd();
};

formLocation.addEventListener('submit', submitAddCardForm)
/*
function() {
  submitAddCardForm();
});

popupButtonSaveAdd.addEventListener('click', function() {
  submitAddCardForm();  
});*/

/* задаём функцию закрытия popup-photo и срабатывание при клике на крестик-photo */ 
function closePopupPhoto() { 
  closePopup(popupPhoto);
};
popupCloseButtonPhoto.addEventListener('click', closePopupPhoto);








enableValidation(validation);