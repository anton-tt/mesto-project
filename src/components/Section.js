export default class Section {

    /* конструктор принимает объект (параметр 1) со свойством renderer — это функция, которая отвечает за создание и отрисовку 
    данных на странице. Параметр 2 - селектор контейнера, в который нужно добавлять созданные элементы */
  constructor (renderer, selector) { 
    this._renderer = renderer;
    this._container = document.querySelector(selector); 
  }
  
    // метод, который принимает DOM-элемент и добавляет его в контейнер
    addOneItem(card) {
    this._container.prepend(card);
  }
  
  addArrItem(card) {
    this._container.append(card);
  }

    // метод, который отвечает за отрисовку всех элементов
  drawAllItems(items, userId) {
    items.forEach((item) => {
      const card = this._renderer(item, userId); 
      this.addArrItem(card);    
    })
  }
    // метод, который отвечает за отрисовку добавленной карточки
  drawItem(item, userId) {
    const card = this._renderer(item, userId); 
    this.addOneItem(card);    
  }
 
}