//import { page, popupPhoto, popupCloseButtonPhoto, validation } from '../utils/constants.js';

  /* задаём функцию - при клике на "тёмный фон" закрывается любой открытый popup */
/*function closePopupClick(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
};
  
  /* задаём функцию - при срабатывании клавиши Esc закрывается любой открытый popup */
/*function closePopupEscape (event, popupOpened) {
  if (event.key === 'Escape') {
    const popupOpened = page.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

  /* задаём функции, которые открывают - закрывают целевой popup и подключают - отключают слушателей событий на закрытие */ 
/*function openPopup(popup) { 
  popup.classList.add('popup_opened');
  const popupOpened = page.querySelector('.popup_opened');
  page.addEventListener('click', closePopupClick);
  page.addEventListener('keyup', closePopupEscape); 
};

function closePopup(popup) { 
  popup.classList.remove('popup_opened');
  page.removeEventListener('click', closePopupClick);
  page.removeEventListener('keyup', closePopupEscape); 
}; 

/* задаём  функцию открытия popup-photo */
 /*function openPopupPhoto() { 
  openPopup(popupPhoto);
};

/* задаём функцию закрытия popup-photo и срабатывание при клике на крестик-photo */ 
/*function closePopupPhoto() { 
  closePopup(popupPhoto);
};
popupCloseButtonPhoto.addEventListener('click', closePopupPhoto);*/