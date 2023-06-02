export default class UserInfo {
  
  constructor(userData) { 
    this._userName = document.querySelector(userData.selectorName);
    this._userProfession = document.querySelector(userData.selectorProfession);
    this._userAvatar = document.querySelector(userData.selectorAvatar);
  }
    // метод, который возвращает объект с данными пользователя (перед этим их получили от методов класса Api) 
  getUserInfo() {
    console.log();
    return {
    name: this._userName.textContent,
    about: this._userProfession.textContent,
    avatar: this._userAvatar
    }
  }

    // метод, который принимает новые данные пользователя, полученные от сервера, и добавляет их на страницу
  setUserInfo = (data) => {
    this._userName.textContent = data.name;
    this._userProfession.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }

}