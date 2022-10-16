const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const hamburguerIcon = document.querySelector('.nav-hamburguer');
const mobileMenu = document.querySelector('.mobile-menu');
const shopingCartIcon = document.querySelector('.shoping-cart_container');
const shopingCartMenu = document.querySelector('.my-order');
const shopingCartLeftArrow = document.querySelector('.left-arrow');
const cardsContainer = document.querySelector(".cards-container")

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
  price: 220.00,
  image: './img/bike.jpeg'
})
productList.push({
  name: 'Shelf',
  price: 80,
  image: './img/round-shelf.jpg'
})


for(product of productList) {
  const productArticle = document.createElement("article")
  productArticle.classList.add("product-card")


  const productImg = document.createElement("img")
  productImg.setAttribute("src", product.image)

  const productInfoContainer = document.createElement("div")
  productInfoContainer.classList.add("product-info")

  const priceAndNameContainer = document.createElement("div")

  const productPrice = document.createElement("p")
  productPrice.innerText = "$ " + product.price
  productPrice.classList.add("product-price")

  const productName = document.createElement("p")
  productName.innerText = product.name
  productName.classList.add("product-name")

  const productFigure = document.createElement("figure")
  const productIcon = document.createElement("img")
  productIcon.setAttribute("src", "icons/bt_add_to_cart.svg")
  
  productFigure.append(productIcon)
  productArticle.append(productImg, productInfoContainer)
  priceAndNameContainer.append(productPrice, productName)
  productInfoContainer.append(priceAndNameContainer, productFigure)

  cardsContainer.appendChild(productArticle)
}
