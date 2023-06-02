/*const apiId = {
    urlBase: 'https://nomoreparties.co/v1/plus-cohort-23/',
    headers: {
        authorization: 'e1af8fdb-dc43-4ad1-80c1-f523f688a620',
        'Content-Type': 'application/json'
    }
}*/
export default class Api {

  constructor(options) { 
    this._urlBase = options.urlBase;
    this._headers = options.headers;
  }

  _chekResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._urlBase}users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._chekResponse);
  }

  getCards() {
    return fetch(`${this._urlBase}cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._chekResponse);
  }

  editProfileServer(user) {
    return fetch(`${this._urlBase}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })    
    }).then(this._chekResponse);
  }

  addNewCard(card) {
    return fetch(`${this._urlBase}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
        })    
    }).then(this._chekResponse);
  }

  deleteCardServer(cardId) {
    return fetch(`${this._urlBase}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers    
    }).then(this._chekResponse);
  }

  addCardLike(cardId) {
    return fetch(`${this._urlBase}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._chekResponse);
  }

  deleteCardLike(cardId) {
    return fetch(`${this._urlBase}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers    
    }).then(this._chekResponse);
  }

  editAvatarProfile(user) {
    return fetch(`${this._urlBase}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar
      })    
    }).then(this._chekResponse);
  }

}