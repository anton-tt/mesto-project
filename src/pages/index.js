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
  
  // запускаем валидацию для трёх попапов
const formEditProfileValidator = new FormValidator(validation, document.forms.user);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(validation, document.forms.location);
formAddCardValidator.enableValidation();
const formEditAvatarValidator = new FormValidator(validation, document.forms.avatar);
formEditAvatarValidator.enableValidation();

let user = {};

const section = new Section((dataCard, userId) => {return createCard (dataCard, userId);}, '.elements__cards');
const popupWithImage = new PopupWithImage('.popup_photo');    
  
  // функция, обеспечивающая раскрытие попапа
const handleCardClick = (cardPhoto, cardTitle) => {
  popupWithImage.open(cardPhoto, cardTitle);
}

  // функция, которая отправляет запрос на сервер на удаление карточки и запускает в работу ответ
function deleteCardServer (cardElement, cardId, cardClass) {
  api.deleteCardServer(cardId)
  .then(() => {
    cardClass.deleteCard(cardElement)
  })
  .catch((err) => {
    console.log(err);
  })   
};

  // функция, которая отправляет запрос на сервер на постановку / удаление лайка и запускает в работу ответ
function changeLikeServer(cardElement, cardId, cardClass) {   
  if (!cardClass.isLike(cardElement)) {
    api.addCardLike(cardId)
      .then((data) => {
        cardClass.changeLike(cardElement, data);
      })
      .catch((err) => {
        console.log(err);
      })  
  } else {
    api.deleteCardLike(cardId)
      .then((data) => {
        cardClass.changeLike(cardElement, data);
      })
      .catch((err) => {
        console.log(err);
      })  
  }
};

const createCard = (dataCard, userId) => {
  const cardNew = new Card(dataCard, 
                           userId, 
                           '.card-template_type_default', 
                           handleCardClick, 
                           (cardElement, cardId) => { deleteCardServer(cardElement, cardId, cardNew) },
                           (cardElement, cardId) => { changeLikeServer(cardElement, cardId, cardNew)} );
  return cardNew.generate();
}

  // получаем актуальную информацию с сервера по пользователю и набору карточек
const promises = [api.getUserInfo(), api.getCards()];
Promise.all(promises)
  .then(([userData, cardsData]) => {
    user = userData;    
    userInfo.setUserInfo(user);
    section.drawAllItems(cardsData, user._id);
  })
  .catch((err) => {
      console.log(err);
  });   
  
  // организуем работу попапа редактирования профиля   
const popupEditProfile = new PopupWithForm('.popup_edit', (valuesForm) => { submitEditProfileForm(valuesForm) });

profileButtonEdit.addEventListener('click', (event) => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formEditProfileValidator.hideFormError();
  formEditProfileValidator.disabledButtonSave(popupSaveButtonEdit);
});

const submitEditProfileForm = (valuesForm) => {
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


  // организуем работу попапа добавления карточки
const popupAddCard = new PopupWithForm('.popup_add', (valuesForm) => { submitAddCardForm(valuesForm) });

profileButtonAdd.addEventListener('click', (event) => {
  popupAddCard.open();
  formAddCardValidator.hideFormError();
  formAddCardValidator.disabledButtonSave(popupSaveButtonAdd);
});

const submitAddCardForm = (valuesForm) => {
  popupAddCard.setTitleButtonSave("Сохранение...");
  api.addNewCard(valuesForm)
    .then((dataCard) => {  
      section.drawItem(dataCard, user._id);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.setTitleButtonSave("Сохранить");
    }); 
}

  // организуем работу попапа редактирования аватарки
const popupEditAvatar = new PopupWithForm('.popup_avatar', (valuesForm) => { submitEditAvatarForm(valuesForm) });

profileButtonAvatar.addEventListener('click', (event) => {
  popupEditAvatar.open();
  formEditAvatarValidator.hideFormError();
  formEditAvatarValidator.disabledButtonSave(popupSaveButtonAvatar);
});

const submitEditAvatarForm = (valuesForm) => {
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