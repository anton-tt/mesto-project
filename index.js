/* задаём переменные для обращения к разным popup */
const page = document.querySelector('.page');
const popupEditProfile = page.querySelector('.popup_edit');
const popupAddCard = page.querySelector('.popup_add');
const popupPhoto = page.querySelector('.popup_photo');
/* задаём функции с одним параметром, которые открывают - закрывают popup */ 
function openPopup(popup) { 
  popup.classList.add('popup_opened');
  page.addEventListener('click', closePopupClick);
  page.addEventListener('keyup', closePopupEscape); 
};
function closePopup(popup) { 
  popup.classList.remove('popup_opened');
  page.removeEventListener('click', closePopupClick);
  page.removeEventListener('keyup', closePopupEscape); 
};

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

/* задаём переменные для обращения к кнопкам Сохранить-edit и Сохранить-add в popup*/
const popupButtonSaveEdit = popupEditProfile.querySelector('.popup__button-save_edit');  
const popupButtonSaveAdd = popupAddCard.querySelector('.popup__button-save_add');

/* задаём переменные для обращения к "крестикам" в разных popup*/
const popupCloseButtonEdit = popupEditProfile.querySelector('.popup__close-button_edit');
const popupCloseButtonAdd = popupAddCard.querySelector('.popup__close-button_add');
const popupCloseButtonPhoto = popupPhoto.querySelector('.popup__close-button_photo');

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
function openPopupPhoto() { 
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
function changeLike(сardElement) {    
  сardElement.classList.toggle('element__card-like_active');
};
/* функция, которая удаляет карточку со страницы*/
function deleteCard(сardElement) {    
  сardElement.closest('.element').remove();
};

/* функция с двумя параметрами - имя карточки и ссылка на фото, которая создаёт карточку */  
function createCard(titlePhoto, imagePhoto) {
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
function addCard(functionCreateElement) {
  elementsCards.prepend(functionCreateElement);
};
 
/* создаём начальные карточки, используя элементы массива как аргументы для функции, создающей карточку,
добавляем карточку на страницу и задаём ей доп.возможности через слушателей событий */
initialCards.forEach((item) => {
  const createCardBasis = createCard(item.name, item.link); 
  addCard(createCardBasis);     
});
  
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

/* задаём функцию - при клике на "тёмный фон" закрывается любой открытый popup */
function closePopupClick(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
};

/* задаём функцию - при срабатывании клавиши Esc закрывается любой открытый popup */
function closePopupEscape (event) {
  const popupOpened = page.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popupOpened);
  }
};


const validation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: '.popup__button_disabled',
  inputErrorClass: 'popup__info_input_error',
  errorClass: 'popup__errorInput_active'
}

/* задаём функции, которая выделит поле формы с невалидными данными и которая снимет выделение */
const showInputError = (formElement, inputElement, errorMessage, object) => { 
  /* получаем элемент с текстом об ошибке, визуализируем его и добавляем текст в сообщение пользователю */ 
  const errorElement = formElement.querySelector(`.popup__errorInput_id_${inputElement.id}`);
  errorElement.classList.add(object.errorClass);
  errorElement.textContent = errorMessage;
  /* выделяем поле с невалидными данными */
  inputElement.classList.add(object.inputErrorClass);  
};

const hideInputError = (formElement, inputElement, object) => {
  /* получаем элемент с текстом об ошибке, скрываем его и удаляем текст в сообщении пользователю */ 
  const errorElement = formElement.querySelector(`.popup__errorInput_id_${inputElement.id}`);
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
  /* снимаем выделение с поля с невалидными данными */
  inputElement.classList.remove(object.inputErrorClass); 
}; 

/* задаём функцию, которая проверит валидность поля формы */
const isValid = (formElement, inputElement, object) => {
  /* сначала проверяем данные требованиями регулярных выражений */
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorText);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  } else {
    hideInputError(formElement, inputElement, object);
  }
}; 

/* задаём фукцию, которая добавляет полям формы обработчик события */
const setEventListeners = (formElement, object) => {
  /* получаем поля формы */
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  /* каждому полю добавляем обработчик события input и вызываем функцию, проверяющую его валидность */
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, object)
    });
  });
}; 

const enableValidation = (object) => {
  /* получаем все формы */
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  /* для каждой формы вызываем функцию, которая добавит её полям обработчики событий */
  formList.forEach((formElement) => {
    setEventListeners(formElement, object);
  });
};

enableValidation(validation);
