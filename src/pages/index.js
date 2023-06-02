import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import { apiId, userSelectors, validation, profileButtonEdit, profileButtonAdd, profileButtonAvatar, 
  popupSaveButtonEdit, popupSaveButtonAdd, popupSaveButtonAvatar } from '../utils/constants.js';

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

  // получаем актуальную информацию с сервера по пользователю и набору карточек
const promises = [api.getUserInfo(), api.getCards()];
Promise.all(promises)
  .then(([userData, cardsData]) => {
    user = userData;    
    userInfo.setUserInfo(user);
    section.pictureAllItems(cardsData, user);
  })
  .catch((err) => {
      console.log(err);
  });   

  // организуем работу попапа редактирования профиля
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

  // организуем работу попапа добавления карточки
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

  // организуем работу попапа редактирования аватарки
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