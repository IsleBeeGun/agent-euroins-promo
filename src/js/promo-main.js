import '../styles/promo-main.scss';
import './burger-menu';
import './modal';
import { handleFormByID } from './forms-logic';
import zenScroll from 'zenscroll';

// Setup forms
const formDesktop = handleFormByID('form-desktop');
const formMobile = handleFormByID('form-mobile');

// Setup scroll
zenScroll.setup(null, 0); // setting top offset to zero
