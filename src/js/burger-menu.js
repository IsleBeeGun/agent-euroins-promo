const burger = document.querySelector('#burger');
burger.addEventListener('click', () => {
  const links = document.querySelector('#burger-container');
  if (links.classList.contains('burger-container-hidden')) {
    links.classList.remove('burger-container-hidden');
    links.classList.add('burger-container-visible');
    burger.classList.add('burger-active');
    document.querySelector('html').style.overflow = 'hidden';
  } else {
    links.classList.remove('burger-container-visible');
    links.classList.add('burger-container-hidden');
    burger.classList.remove('burger-active');
    document.querySelector('html').style.overflow = 'visible';
  }
});
const textNextToBurger = burger.closest('div').previousElementSibling;
if (textNextToBurger) {
  textNextToBurger.style.cursor = 'pointer';
  textNextToBurger.addEventListener('click', () => {
    burger.click();
  });
}
const links = document.querySelectorAll('#burger-container a');
for (const link of links) {
  link.addEventListener('click', () => {
    burger.click();
  });
}
