// Regular Expressions
const REGEX_PHONE = /^((\+7|7|8)+([0-9]){10})/;
const REGEX_NAME = /^.{3,}$/;
const REGEX_DAY = /^([1-9]|[0-2][0-9]|[3][0-1])$/;
const REGEX_MONTH = /^([1-9]|[0][1-9]|[0-1][0-2])$/;
const REGEX_YEAR = /^[0-9]{4}$/;

// Validation (suitable for all fields)
const setCssValid = target => {
  target.classList.add('fieldValid');
  target.classList.remove('fieldInvalid');
};
const setCssInvalid = target => {
  target.classList.add('fieldInvalid');
  target.classList.remove('fieldValid');
};
const validateField = event => {
  let target = event.target;
  if (target.name == 'name') {
    REGEX_NAME.test(target.value) ? setCssValid(target) : setCssInvalid(target);
  }
  if (target.name == 'phone') {
    REGEX_PHONE.test(target.value)
      ? setCssValid(target)
      : setCssInvalid(target);
  }
  if (target.name == 'day') {
    REGEX_DAY.test(target.value) ? setCssValid(target) : setCssInvalid(target);
  }
  if (target.name == 'month') {
    REGEX_MONTH.test(target.value)
      ? setCssValid(target)
      : setCssInvalid(target);
  }
  if (target.name == 'year') {
    REGEX_YEAR.test(target.value) ? setCssValid(target) : setCssInvalid(target);
  }
};

const validateFormByID = id => {
  // -- Action on submit
  const form = document.querySelector(`#${id}`);
  form.addEventListener('submit', event => {
    event.preventDefault();
    alert('Submitted');
  });
  // -- Name validation
  let name = form.elements.namedItem('name');
  name.addEventListener('input', validateField);

  // -- Phone validation
  let phone = form.elements.namedItem('phone');
  phone.addEventListener('input', validateField);

  // -- Day validation
  let day = form.elements.namedItem('day');
  day.addEventListener('input', validateField);

  // -- Month validation
  let month = form.elements.namedItem('month');
  month.addEventListener('input', validateField);

  // -- Year validation
  let year = form.elements.namedItem('year');
  year.addEventListener('input', validateField);

  return form;
};

const formDesktop = validateFormByID('form-desktop');
const formMobile = validateFormByID('form-mobile');
