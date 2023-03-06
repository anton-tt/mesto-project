import { page, popupPhoto, popupCloseButtonPhoto } from './constants.js';

  /* задаём функцию - при клике на "тёмный фон" закрывается любой открытый popup */
export function closePopupClick(event) {
  if (event.target.classList.contains('popup_opened')) {
    closePopup(event.target);
  }
};
  
  /* задаём функцию - при срабатывании клавиши Esc закрывается любой открытый popup */
export function closePopupEscape (event) {
  const popupOpened = page.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    closePopup(popupOpened);
  }
};

  /* задаём функции, которые открывают - закрывают целевой popup и подключают -отключают слушателей событий на закрытие */ 
export function openPopup(popup) { 
  popup.classList.add('popup_opened');
  page.addEventListener('click', closePopupClick);
  page.addEventListener('keyup', closePopupEscape); 
};

export function closePopup(popup) { 
  popup.classList.remove('popup_opened');
  page.removeEventListener('click', closePopupClick);
  page.removeEventListener('keyup', closePopupEscape); 
}; 

/* задаём  функцию открытия popup-photo */
export function openPopupPhoto() { 
  openPopup(popupPhoto);
};

/* задаём функцию закрытия popup-photo и срабатывание при клике на крестик-photo */ 
export function closePopupPhoto() { 
  closePopup(popupPhoto);
};
popupCloseButtonPhoto.addEventListener('click', closePopupPhoto);