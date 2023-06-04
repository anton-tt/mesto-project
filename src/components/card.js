export default class Card {

    constructor(dataCard, userId, templateSelector, handleCardClick, deleteCardServer, changeLikeServer) { 
      this._titlePhoto = dataCard.name;
      this._imagePhoto = dataCard.link;
      this._cardLikesArr = dataCard.likes;
      this._cardId = dataCard._id;
      this._cardAddUserId = dataCard.owner._id;
      this._userId = userId;
      this._selector = templateSelector;
      
      this._handleCardClick = handleCardClick;
      this._deleteCardServer = deleteCardServer;
      this._changeLikeServer = changeLikeServer;
    }
  
    _getElement() {
      const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.element')
        .cloneNode(true);
      return cardElement;
    };
  
      // функция, задающая активное состояние значка лайка при первичной загрузке карточек
    _displayLike(cardElement) {
      this._cardLikesArr.forEach((item) => {  
        if (item._id === this._userId) {
          cardElement.querySelector('.element__card-like').classList.add('element__card-like_active');
        }
      });
    };
  
      // метод, который удаляет карточку со страницы
    deleteCard(cardElement) {
      cardElement.closest('.element').remove(); 
    }
  
      // метод, который возвращает булево значение в зависимости поставил ли ранее пользователь карточке лайк или нет
    isLike(cardElement) {
      const like = cardElement.querySelector('.element__card-like').classList.contains('element__card-like_active');
      if (like) {
        return true
      } else {
        return false
      }
    }
    
      // метод, который ставит лайк карточке
    changeLike(cardElement, data) {
      cardElement.querySelector('.element__card-like').classList.toggle('element__card-like_active');
      cardElement.querySelector('.element__card-number').textContent = data.likes.length;
    }

    generate() {
      this._element = this._getElement();
      this._element.querySelector('.element__card-photo').src = this._imagePhoto;
      this._element.querySelector('.element__card-name').textContent = this._titlePhoto;
      this._displayLike(this._element);
      this._element.querySelector('.element__card-number').textContent = this._cardLikesArr.length;
      
      if (this._cardAddUserId === this._userId) {
        this._element.querySelector('.element__card-trash').classList.add('element__card-trash_active');
        this._element.querySelector('.element__card-trash').addEventListener('click', (event) => {
          this._deleteCardServer(this._element, this._cardId) });
      }
  
      this._element.querySelector('.element__card-like').addEventListener('click', (event) => { 
        this._changeLikeServer(this._element, this._cardId) });
      this._element.querySelector('.element__card-photo').addEventListener('click', (event) => { 
        this._handleCardClick(this._imagePhoto, this._titlePhoto)});
      return this._element;
    };

  }