const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const hamburguerIcon = document.querySelector('.nav-hamburguer');
const mobileMenu = document.querySelector('.mobile-menu');
const shopingCartIcon = document.querySelector('.shoping-cart_container');
const shopingCartMenu = document.querySelector('.my-order');
const shopingCartLeftArrow = document.querySelector('.left-arrow');

menuEmail.addEventListener('click', toggleDesktopMenu);
hamburguerIcon.addEventListener('click', toggleMobileMenu);
shopingCartIcon.addEventListener('click', toggleShopingCartMenu);
shopingCartLeftArrow.addEventListener('click', toggleShopingCartMenu);

function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive')
  shopingCartMenu.classList.add('inactive')
}
function toggleMobileMenu() {
  mobileMenu.classList.toggle('inactive')
  shopingCartMenu.classList.add('inactive')
}
function toggleShopingCartMenu() {
  shopingCartMenu.classList.toggle('inactive')
  desktopMenu.classList.add('inactive')
  mobileMenu.classList.add('inactive')
}

const productList = [];
productList.push({
  name: 'Bike',
  price: 220,
  image: './img/bike.jpeg'
})
productList.push({
  name: 'Shelf',
  price: 80,
  image: './img/round-shelf.jpg'
})

for(product of productList) {
  console.log()
}