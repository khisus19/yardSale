const menuEmail = document.querySelector('.navbar-email');
const desktopMenu = document.querySelector('.desktop-menu');
const hamburguerIcon = document.querySelector('.nav-hamburguer');
const mobileMenu = document.querySelector('.mobile-menu');
const shoppingCartIcon = document.querySelector('.shopping-cart_container');
const shoppingCartMenu = document.querySelector('.my-order');
const shoppingCartLeftArrow = document.querySelector('.left-arrow');
const cardsContainer = document.querySelector(".cards-container");
const productDetailedAside = document.querySelector("#product-detailed");
const productDetailedCloseIcon = document.querySelector("#product-detail-close-icon");

let shoppingCartContent = [];

menuEmail.addEventListener('click', toggleDesktopMenu);
hamburguerIcon.addEventListener('click', toggleMobileMenu);
shoppingCartIcon.addEventListener('click', toggleShoppingCartMenu);
shoppingCartLeftArrow.addEventListener('click', toggleShoppingCartMenu);
productDetailedCloseIcon.addEventListener("click", closeProductDetailedAside)

function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive');
  shoppingCartMenu.classList.add('inactive');
  productDetailedAside.classList.add("inactive");
}
function toggleMobileMenu() {
  mobileMenu.classList.toggle('inactive');
  shoppingCartMenu.classList.add('inactive');
  productDetailedAside.classList.add("inactive");
}
function toggleShoppingCartMenu() {
  shoppingCartMenu.classList.toggle('inactive');
  desktopMenu.classList.add('inactive');
  mobileMenu.classList.add('inactive');
  productDetailedAside.classList.add("inactive");
}
function openProductDetailedAside() {
  productDetailedAside.classList.remove("inactive");

  mobileMenu.classList.add('inactive');
  shoppingCartMenu.classList.add("inactive");
  desktopMenu.classList.add("inactive");
}
function closeProductDetailedAside() {
  productDetailedAside.classList.add("inactive")
}


function renderProducts(arr) {
  for(product of arr) {
    const productArticle = document.createElement("article")
    productArticle.classList.add("product-card")


    const productImg = document.createElement("img")
    productImg.setAttribute("src", product.images[0] || "./img/bike.jpeg")
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
  renderProducts(productList)
}
getProducts()

function renderProductDetailed(event) {
  let imgPath = event.target.src

  let productToDetail = productList.find(item => item.images[0] === imgPath);

  const productDetailedImg = document.querySelector("#product-img");
  productDetailedImg.setAttribute("src", productToDetail.images[0]);
  productDetailedImg.setAttribute("alt", productToDetail.title);


  const productDetailedPrice = document.querySelector("#product-price");
  productDetailedPrice.innerText = "$ " + productToDetail.price;

  const productDetailedTitle = document.querySelector("#product-title");
  productDetailedTitle.innerText = productToDetail.title;

  const productDetailedDescription = document.querySelector(".product-description");
  productDetailedDescription.innerText = productToDetail.description;

  const productDetailedButton = document.querySelector("#add-to-cart-button");
  productDetailedButton.addEventListener("click", (event) => {
    const id = event.target.parentElement.children[1].nextElementSibling.textContent
    addItemToCart(id)
  })

  openProductDetailedAside()
}

// REMOVE CART ITEMS
const removeCartItemsButtons = document.querySelectorAll(".remove-order-item-icon");

for (let i = 0; i < removeCartItemsButtons.length; i++) {
  let button = removeCartItemsButtons[i];
  button.addEventListener("click", removeCartItem)
}

function removeCartItem(event){
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  const cartOrderList = document.querySelector("#order-list-container");
  const cartItemsArray = cartOrderList.querySelectorAll(".list-item-container")
  let total = 0
  for (let i = 0; i < cartItemsArray.length; i++) {
    const cartItem = cartItemsArray[i];
    const priceElement = cartItem.querySelector(".item-price-container p");
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    total = total + price;
  }
  total = total.toFixed(2)
  const cartTotalElement = document.getElementById("my-order-total")
  cartTotalElement.innerText = "$" + total
}