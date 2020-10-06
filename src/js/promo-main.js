import '../styles/promo-main.scss';
//import '../js/menu';
import { handleFormByID } from './forms-logic';

// Setup forms

const formDesktop = handleFormByID('form-desktop');
const formMobile = handleFormByID('form-mobile');

const burger = document.querySelector('#burger');
burger.addEventListener('click', () => {
  const links = document.querySelector('#burger-links');
  if (links.classList.contains('burger-links-hidden')) {
    links.classList.remove('burger-links-hidden');
    links.classList.add('burger-links-visible');
    burger.classList.add('burger-active');
  } else {
    links.classList.remove('burger-links-visible');
    links.classList.add('burger-links-hidden');
    burger.classList.remove('burger-active');
  }
});
