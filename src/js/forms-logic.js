// importing input mask plugin
import IMask from 'imask';
import sendHttpRequest from './sendHttpRequest';

// setting input masks
const inputMaskPhoneOptions = {
  mask: '+0 (000) 000-00-00',
};
const inputMaskDayMonthOptions = {
  mask: '00',
};
const inputMaskYearOptions = {
  mask: '0000',
};

// Regular Expressions
const REGEX_PHONE = /^\+\d{1,2}\s+?\(\d{3,5}\)\s+?\d{1,3}-\d{2}-\d{2}$/;
const REGEX_NAME = /^(?:[A-Za-z|А-Яа-яёЁ]+[ \t]+){2}[A-Za-z|А-Яа-яёЁ]+$/;
const REGEX_DAY = /^([1-9]|[0-2][0-9]|[3][0-1])$/;
const REGEX_MONTH = /^([1-9]|[0][1-9]|[0-1][0-2])$/;
const REGEX_YEAR = /^[0-9]{4}$/;

// Additional constants
const YEAR_MAX = new Date().getFullYear() - 18;
const YEAR_MIN = 1900;

// Validation (suitable for all fields)
const setCssValid = (target) => {
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
const setCssInvalid = (target) => {
  hideCheck(target);
  colorWarning(target);
};
const showCheck = (target) => {
  if (target.nextElementSibling) {
    target.nextElementSibling.classList.remove('is-invisible');
  }
};
const hideCheck = (target) => {
  if (target.nextElementSibling) {
    target.nextElementSibling.classList.add('is-invisible');
  }
};
const colorSuccess = (target) => {
  target.classList.add('fieldValid');
  target.classList.remove('fieldInvalid');
};
const colorWarning = (target) => {
  target.classList.add('fieldInvalid');
  target.classList.remove('fieldValid');
};
const validateField = (event, inputMask) => {
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
    // modify if wrong
    if (target.value.substr(0, 2) !== '+7') {
      inputMask.value = target.value.replace(/^\+\d{1,2}/, '+7');
      REGEX_PHONE.test(target.value)
        ? setCssValid(target)
        : setCssInvalid(target);
    }
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
    // reset if wrong
    if (!'0123'.includes(target.value[0])) {
      setCssInvalid(target);
      inputMask.value = '';
    }
    if (+target.value < 0 || +target.value > 31) {
      inputMask.value = '';
    }
    if (target.value === '00') {
      setCssInvalid(target);
      inputMask.value = '';
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
    // reset if wrong
    if (!'01'.includes(target.value[0])) {
      setCssInvalid(target);
      inputMask.value = '';
    }
    if (+target.value < 0 || +target.value > 12) {
      inputMask.value = '';
    }
    if (target.value === '00') {
      setCssInvalid(target);
      inputMask.value = '';
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
    // reset if wrong
    if (!'12'.includes(target.value[0])) {
      setCssInvalid(target);
      inputMask.value = '';
    }
  }
};

export const handleFormByID = (id) => {
  // -- Getting form by id
  const form = document.querySelector(`#${id}`);
  // -- Name handling
  let name = form.elements.namedItem('name');
  name.addEventListener('input', validateField);
  // -- Phone handling
  let phone = form.elements.namedItem('phone');
  let inputMaskPhone = IMask(phone, inputMaskPhoneOptions);
  phone.addEventListener('input', (event) =>
    validateField(event, inputMaskPhone)
  );
  // -- Day handling
  let day = form.elements.namedItem('day');
  let inputMaskDay = IMask(day, inputMaskDayMonthOptions);
  day.addEventListener('input', (event) => validateField(event, inputMaskDay));
  // -- Month handling
  let month = form.elements.namedItem('month');
  let inputMaskMonth = IMask(month, inputMaskDayMonthOptions);
  month.addEventListener('input', (event) =>
    validateField(event, inputMaskMonth)
  );
  // -- Year handling
  let year = form.elements.namedItem('year');
  let inputMaskYear = IMask(year, inputMaskYearOptions);
  year.addEventListener('input', (event) =>
    validateField(event, inputMaskYear)
  );
  // - Handling submit action
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (
      !REGEX_NAME.test(name.value) ||
      !REGEX_PHONE.test(phone.value) ||
      !REGEX_YEAR.test(year.value) ||
      +year.value < YEAR_MIN ||
      +year.value > YEAR_MAX
    ) {
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
      if (
        !REGEX_YEAR.test(year.value) ||
        +year.value < YEAR_MIN ||
        +year.value > YEAR_MAX
      ) {
        year.focus();
        setCssInvalid(year);
        if (year.nextElementSibling) {
          year.nextElementSibling.classList.remove('is-invisible');
          year.nextElementSibling.children[0].classList.remove(
            'fa-check',
            'has-text-success'
          );
          year.nextElementSibling.children[0].classList.add(
            'fa-exclamation-triangle',
            'has-text-danger'
          );
        }
      }
    } else {
      // const birthday = `${day.value.length > 1 ? day.value : '0' + day.value}.${
      //   month.value.length > 1 ? month.value : '0' + month.value
      // }.${year.value}`;
      const birthday = `${year.value}-${
        month.value.length > 1 ? month.value : '0' + month.value
      }-${day.value.length > 1 ? day.value : '0' + day.value}`;
      const [lastName, firstName, middleName] = name.value
        .replace(/\s+/g, ' ')
        .split(' ');
      const modifiedPhone = phone.value.replace(/\D+/g, '').slice(-10);
      // v------------------ Getting Recaptcha and sending request -----------------v
      grecaptcha.ready(function () {
        // do request for recaptcha token
        // response is promise with passed token
        grecaptcha
          .execute('6LeN1OcUAAAAACGHK_wHWQNG4Sef_49nLH3jF9JQ', {
            action: 'submit',
          })
          .then(function (token) {
            return {
              recaptchaResponse: token,
              firstName,
              lastName,
              middleName,
              birthday,
              phone: modifiedPhone,
            };
          })
          .then((body) =>
            sendHttpRequest(
              body,
              'https://agent.euro-ins.ru/account/new',
              'POST'
            )
          )
          .then((res) => {
            console.log('[first res:]', res);
            document.querySelector('html').style.overflow = 'hidden';
            document.querySelector(
              '.modal-message'
            ).innerHTML = `<h3 class='has-text-success is-size-5'>Заявка на регистрацию успешно отправлена!</h3>  
            <p>Запрос на регистрацию принят. Пароль для входа кабинет отправлен по SMS на номер, указанный при регистрации.</p>
            <br>
            <p style="text-align: center">
              <a href="https://agent.euro-ins.ru/login" class="button is-warning is-normal has-text-weight-bold is-fullwidth-sm">
                Войти в личный кабинет
              </a>
            <p>`;
            document
              .querySelector('.modal-backdrop')
              .setAttribute('style', 'visibility:visible; opacity: 1;');
            document
              .querySelector('.modal-window')
              .setAttribute('style', 'visibility:visible; opacity: 1;');
          })
          .catch((rej) => {
            if (rej === null) {
              const errorMessageHTML = `<h3 class='has-text-danger is-size-5'>Что-то пошло не так:</h3> <p>Неизвестная ошибка</p>`;
              document.querySelector(
                '.modal-message'
              ).innerHTML = errorMessageHTML;
            } else {
              if (rej.errors) {
                const listOfErrors = [];
                let listOfErrorsHTML = '';
                for (const key in rej.errors) {
                  listOfErrors.push(rej.errors[key]);
                }
                for (const error of listOfErrors) {
                  listOfErrorsHTML += `<li class='mb-2'>${error}</li>`;
                }
                const errorMessageHTML = `<h3 class='has-text-danger is-size-5'>Что-то пошло не так:</h3> <ul>${listOfErrorsHTML}</ul>`;
                document.querySelector(
                  '.modal-message'
                ).innerHTML = errorMessageHTML;
              } else {
                const errorMessageHTML = `<h3 class='has-text-danger is-size-5'>Что-то пошло не так:</h3> <p>${rej.status}</p>`;
                document.querySelector(
                  '.modal-message'
                ).innerHTML = errorMessageHTML;
              }
            }

            document.querySelector('html').style.overflow = 'hidden';
            document
              .querySelector('.modal-backdrop')
              .setAttribute('style', 'visibility:visible; opacity: 1;');
            document
              .querySelector('.modal-window')
              .setAttribute('style', 'visibility:visible; opacity: 1;');
          });
      });
      // ^------------------ Getting Recaptcha and sending request -----------------^
    }
  });

  return form;
};
