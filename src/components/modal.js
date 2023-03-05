//import { page } from './index.js';

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