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
  _displayLike() {
    this._cardLikesArr.forEach((item) => {  
      if (item._id === this._userId) {
        this._cardLike.classList.add('element__card-like_active');
      }
    });
  };
  
    // метод, который удаляет карточку со страницы
  deleteCard() {
    this._element.closest('.element').remove(); 
  }
  
    // метод, который возвращает булево значение в зависимости поставил ли ранее пользователь карточке лайк или нет
  isLike() {
    const like = this._cardLike.classList.contains('element__card-like_active');
    if (like) {
      return true
    } else {
      return false
    }
  }
    
    // метод, который ставит лайк карточке
  changeLike(data) {
    this._cardLike.classList.toggle('element__card-like_active');
    this._cardNumber.textContent = data.likes.length;
  }

  generate() {
    this._element = this._getElement();
    this._cardLike = this._element.querySelector('.element__card-like');
    this._cardNumber = this._element.querySelector('.element__card-number');
    this._cardTrash = this._element.querySelector('.element__card-trash');

    this._element.querySelector('.element__card-photo').src = this._imagePhoto;
    this._element.querySelector('.element__card-name').textContent = this._titlePhoto;
    this._displayLike();
    this._cardNumber.textContent = this._cardLikesArr.length;
      
    if (this._cardAddUserId === this._userId) {
      this._cardTrash.classList.add('element__card-trash_active');
      this._cardTrash.addEventListener('click', (event) => {
        this._deleteCardServer(this._cardId) });
    }
  
    this._cardLike.addEventListener('click', (event) => { 
      this._changeLikeServer(this._cardId) });
    this._element.querySelector('.element__card-photo').addEventListener('click', (event) => { 
      this._handleCardClick(this._imagePhoto, this._titlePhoto)});
    return this._element;
  };

  }