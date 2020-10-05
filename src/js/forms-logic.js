// input mask plugin
import Inputmask from 'inputmask';

const inputMaskPhone = new Inputmask('+7 (999) 999-99-99');
const inputMaskDayMonth = new Inputmask('9{1,2}');
const inputMaskYear = new Inputmask('9999');

// Regular Expressions
const REGEX_PHONE = /^\+\d{1,2}\s+?\(\d{3,5}\)\s+?\d{1,3}-\d{2}-\d{2}$/;
const REGEX_NAME = /(?:[A-Za-z|А-Яа-я]+[ \t]+){2}[A-Za-z|А-Яа-я]+/;
const REGEX_DAY = /^([1-9]|[0-2][0-9]|[3][0-1])$/;
const REGEX_MONTH = /^([1-9]|[0][1-9]|[0-1][0-2])$/;
const REGEX_YEAR = /^[0-9]{4}$/;

// Validation (suitable for all fields)
const setCssValid = target => {
  if (target.nextElementSibling) {
    target.nextElementSibling.children[0].classList.remove(
      'fa-check',
      'has-text-success',
      'has-text-danger'
    );
    target.nextElementSibling.children[0].classList.add(
      'fa-check',
      'has-text-success'
    );
  }
  showCheck(target);
  colorSuccess(target);
};
const setCssInvalid = target => {
  hideCheck(target);
  colorWarning(target);
};
const showCheck = target => {
  if (target.nextElementSibling) {
    target.nextElementSibling.classList.remove('is-invisible');
  }
};
const hideCheck = target => {
  if (target.nextElementSibling) {
    target.nextElementSibling.classList.add('is-invisible');
  }
};
const colorSuccess = target => {
  target.classList.add('fieldValid');
  target.classList.remove('fieldInvalid');
};
const colorWarning = target => {
  target.classList.add('fieldInvalid');
  target.classList.remove('fieldValid');
};
const validateField = event => {
  let target = event.target;
  if (target.name == 'name') {
    // color validation
    REGEX_NAME.test(target.value) ? setCssValid(target) : setCssInvalid(target);
  }
  if (target.name == 'phone') {
    // color validation
    REGEX_PHONE.test(target.value)
      ? setCssValid(target)
      : setCssInvalid(target);
    // input mask
    inputMaskPhone.mask(target);
  }
  if (target.name == 'day') {
    // color validation
    let month = target.closest('.field-body').children[1].children[0]
      .children[0];
    let year = target.closest('.field-body').children[2].children[0]
      .children[0];
    REGEX_DAY.test(target.value) ? setCssValid(target) : setCssInvalid(target);
    if (
      REGEX_MONTH.test(month.value) &&
      REGEX_YEAR.test(year.value) &&
      REGEX_DAY.test(target.value)
    ) {
      setCssValid(year);
      setCssValid(month);
    } else {
      if (REGEX_YEAR.test(year.value)) {
        colorSuccess(year);
        hideCheck(year);
      } else {
        setCssInvalid(year);
      }
      REGEX_MONTH.test(month.value) ? colorSuccess(month) : colorWarning(month);
    }
    // input mask
    inputMaskDayMonth.mask(target);
    // reset if wrong
    if (+target.value <= 0 || +target.value > 31) {
      target.value = '';
    }
  }
  if (target.name == 'month') {
    // color validation
    let day = target.closest('.field-body').children[0].children[0].children[0];
    let year = target.closest('.field-body').children[2].children[0]
      .children[0];
    REGEX_MONTH.test(target.value)
      ? setCssValid(target)
      : setCssInvalid(target);
    if (
      REGEX_DAY.test(day.value) &&
      REGEX_YEAR.test(year.value) &&
      REGEX_MONTH.test(target.value)
    ) {
      setCssValid(year);
      setCssValid(day);
    } else {
      if (REGEX_YEAR.test(year.value)) {
        colorSuccess(year);
        hideCheck(year);
      } else {
        setCssInvalid(year);
      }
      REGEX_DAY.test(day.value) ? colorSuccess(day) : colorWarning(day);
    }
    // input mask
    inputMaskDayMonth.mask(target);
    // reset if wrong
    if (+target.value <= 0 || +target.value > 12) {
      target.value = '';
    }
  }
  if (target.name == 'year') {
    // color validation
    let day = target.closest('.field-body').children[0].children[0].children[0];
    let month = target.closest('.field-body').children[1].children[0]
      .children[0];
    REGEX_YEAR.test(target.value)
      ? colorSuccess(target)
      : setCssInvalid(target);
    if (
      REGEX_DAY.test(day.value) &&
      REGEX_MONTH.test(month.value) &&
      REGEX_YEAR.test(target.value)
    ) {
      setCssValid(target);
    } else {
      REGEX_MONTH.test(month.value) ? colorSuccess(month) : colorWarning(month);
      REGEX_DAY.test(day.value) ? colorSuccess(day) : colorWarning(day);
    }
    // input mask
    inputMaskYear.mask(target);
    // reset if wrong
    if (
      +target.value <= 1917 ||
      +target.value > new Date().getFullYear() - 18
    ) {
      setCssInvalid(target);
      target.value = '';
    }
  }
};

export const handleFormByID = id => {
  // -- Getting form by id
  const form = document.querySelector(`#${id}`);
  // -- Name handling
  let name = form.elements.namedItem('name');
  name.addEventListener('input', validateField);
  // -- Phone handling
  let phone = form.elements.namedItem('phone');
  phone.addEventListener('input', validateField);
  // -- Day handling
  let day = form.elements.namedItem('day');
  day.addEventListener('input', validateField);
  // -- Month handling
  let month = form.elements.namedItem('month');
  month.addEventListener('input', validateField);
  // -- Year handling
  let year = form.elements.namedItem('year');
  year.addEventListener('input', validateField);
  // - Handling submit action
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!REGEX_NAME.test(name.value) || !REGEX_PHONE.test(phone.value)) {
      if (!REGEX_NAME.test(name.value)) {
        name.focus();
        if (name.nextElementSibling) {
          name.nextElementSibling.classList.remove('is-invisible');
          name.nextElementSibling.children[0].classList.remove(
            'fa-check',
            'has-text-success'
          );
          name.nextElementSibling.children[0].classList.add(
            'fa-exclamation-triangle',
            'has-text-danger'
          );
        }
      }
      if (!REGEX_PHONE.test(phone.value)) {
        phone.focus();
        if (phone.nextElementSibling) {
          phone.nextElementSibling.classList.remove('is-invisible');
          phone.nextElementSibling.children[0].classList.remove(
            'fa-check',
            'has-text-success'
          );
          phone.nextElementSibling.children[0].classList.add(
            'fa-exclamation-triangle',
            'has-text-danger'
          );
        }
      }
    } else {
      const birthday = `${day.value.length > 1 ? day.value : '0' + day.value}.${
        month.value.length > 1 ? month.value : '0' + month.value
      }.${year.value}`;
      const [lastName, firstName, middleName] = name.value
        .replace(/\s+/g, ' ')
        .split(' ');
      const body = {
        recaptchaResponse: '???',
        firstName,
        lastName,
        middleName,
        birthday,
        phone: phone.value,
      };
      console.log(body);
      alert('Submitted');
    }
  });

  return form;
};
