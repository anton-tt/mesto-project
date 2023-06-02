export default class Section {

    /* конструктор принимает объект (параметр 1) со свойством renderer — это функция, которая отвечает за создание и отрисовку 
    данных на странице. Параметр 2 - селектор контейнера, в который нужно добавлять созданные элементы */
  constructor (renderer, selector) { 
    this._renderer = renderer;
    this._container = document.querySelector(selector); 
  }
  
    // метод, который принимает DOM-элемент и добавляет его в контейнер
  addItem(card) {
    this._container.prepend(card);
  }
    
    // метод, который отвечает за отрисовку всех элементов
  pictureAllItems(items, user) {
    items.forEach((item) => {
      const card = this._renderer(item, user); 
      this.addItem(card);    
    })
  }
    // метод, который отвечает за отрисовку добавленной карточки
  pictureItem(item, user) {
      const card = this._renderer(item, user); 
      this.addItem(card);    
  }
 
}