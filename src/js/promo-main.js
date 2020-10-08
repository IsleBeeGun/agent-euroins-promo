import '../styles/promo-main.scss';
import './burger-menu';
import { handleFormByID } from './forms-logic';
import 'zenscroll';

// Setup forms
const formDesktop = handleFormByID('form-desktop');
const formMobile = handleFormByID('form-mobile');
