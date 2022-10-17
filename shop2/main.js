const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const hamburguerIcon = document.querySelector('.nav-hamburguer');
const mobileMenu = document.querySelector('.mobile-menu');
const shopingCartIcon = document.querySelector('.shoping-cart_container');
const shopingCartMenu = document.querySelector('.my-order');
const shopingCartLeftArrow = document.querySelector('.left-arrow');
const cardsContainer = document.querySelector(".cards-container");
const productDetailedAside = document.querySelector("#product-detailed");
const productDetailedCloseIcon = document.querySelector("#close-icon");

menuEmail.addEventListener('click', toggleDesktopMenu);
hamburguerIcon.addEventListener('click', toggleMobileMenu);
shopingCartIcon.addEventListener('click', toggleShopingCartMenu);
shopingCartLeftArrow.addEventListener('click', toggleShopingCartMenu);
productDetailedCloseIcon.addEventListener("click", closeProductDetailedAside)

function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive')
  shopingCartMenu.classList.add('inactive')
  productDetailedAside.classList.add("inactive");
}
function toggleMobileMenu() {
  mobileMenu.classList.toggle('inactive')
  shopingCartMenu.classList.add('inactive')
  productDetailedAside.classList.add("inactive")
}
function toggleShopingCartMenu() {
  shopingCartMenu.classList.toggle('inactive')
  desktopMenu.classList.add('inactive')
  mobileMenu.classList.add('inactive')
  productDetailedAside.classList.add("inactive")
}
function openProductDetailedAside() {
  productDetailedAside.classList.remove("inactive")

  mobileMenu.classList.add('inactive');
  shopingCartMenu.classList.add("inactive");
  desktopMenu.classList.add("inactive")
}
function closeProductDetailedAside() {
  productDetailedAside.classList.add("inactive")
}


function renderProducts(arr) {
  for(product of arr) {
    const productArticle = document.createElement("article")
    productArticle.classList.add("product-card")
    
    
    const productImg = document.createElement("img")
    productImg.setAttribute("src", product.images[0])
    productImg.addEventListener("click", renderProductDetailed)
  
    const productInfoContainer = document.createElement("div")
    productInfoContainer.classList.add("product-info")
  
    const priceAndNameContainer = document.createElement("div")
  
    const productPrice = document.createElement("p")
    productPrice.innerText = "$ " + product.price
    productPrice.classList.add("product-price")
  
    const productName = document.createElement("p")
    productName.innerText = product.title
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
}

const productList = [];

async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products")
  const data = await res.json();

  for (let i = 0; i < 50; i++) {
    productList.push(data[i])
  }
  console.log(productList)
  renderProducts(productList)
}
getProducts()

// productList.push({
//   name: 'Bike',
//   price: 220.00,
//   image: './img/bike.jpeg',
//   description: "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles"
// })
// productList.push({
//   name: 'Round Shelf',
//   price: 80,
//   image: './img/round-shelf.jpg',
//   description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit"
// })

function renderProductDetailed(event) {
  let imgPath = event.target.src
  
  let productToDetail = productList.filter(item => item.images[0] === imgPath)[0]
  console.log(imgPath);
  console.log(productToDetail);
  
  const productDetailedImg = document.querySelector("#product-img");
  productDetailedImg.setAttribute("src", productToDetail.images[0]);
  productDetailedImg.setAttribute("alt", productToDetail.title);


  const productDetailedPrice = document.querySelector("#product-price");
  productDetailedPrice.innerText = "$ " + productToDetail.price;

  const productDetailedTitle = document.querySelector("#product-title");
  productDetailedTitle.innerText = productToDetail.title;

  const productDetailedDescription = document.querySelector(".product-description");
  productDetailedDescription.innerText = productToDetail.description;

  const productDetailedButton = document.querySelector(".primary-button");
  
  openProductDetailedAside()
}