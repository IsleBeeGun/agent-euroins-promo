const burger = document.querySelector('#burger');
burger.addEventListener('click', () => {
  const links = document.querySelector('#burger-links');
  if (links.classList.contains('burger-links-hidden')) {
    links.classList.remove('burger-links-hidden');
    links.classList.add('burger-links-visible');
    burger.classList.add('burger-active');
    document.querySelector('html').style.overflow = 'hidden';
  } else {
    links.classList.remove('burger-links-visible');
    links.classList.add('burger-links-hidden');
    burger.classList.remove('burger-active');
    document.querySelector('html').style.overflow = 'visible';
  }
});
