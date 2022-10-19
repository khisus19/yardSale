/* if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready)
} else {
  ready()
} */

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
  updateCartTotal()
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


const productList = [];

async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products")
  const data = await res.json();

  for (let i = 0; i < 50; i++) {
    productList.push(data[i])
  }
  await renderProducts(productList)
}
getProducts()

async function renderProducts(arr) {
  console.log(productList);
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
    productPrice.innerText = "$" + (product.price - 0.01)
    productPrice.classList.add("product-price")

    const productName = document.createElement("p")
    productName.innerText = product.title
    productName.classList.add("product-name")

    const productFigure = document.createElement("figure")
    productFigure.setAttribute("class", "add-to-cart-button-container")
    const productIcon = document.createElement("img")
    productIcon.setAttribute("src", "icons/bt_add_to_cart.svg");

    productFigure.append(productIcon)
    productArticle.append(productImg, productInfoContainer)
    priceAndNameContainer.append(productPrice, productName)
    productInfoContainer.append(priceAndNameContainer, productFigure)

    cardsContainer.appendChild(productArticle)
  }

  getAddCartButtons()
}


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
function addRemoveButtonsListener() {
  const removeCartItemsButtons = document.querySelectorAll(".remove-order-item-icon");

  for (let i = 0; i < removeCartItemsButtons.length; i++) {
    let button = removeCartItemsButtons[i];
    button.addEventListener("click", removeCartItem)
  }
}
addRemoveButtonsListener()


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
    let price = Number(priceElement.innerText.replace("$", ""));
    total = Math.round((total + price) * 100 ) / 100;
  }
  const cartTotalElement = document.getElementById("my-order-total")
  cartTotalElement.innerText = "$" + total;
}

// ADD CART ITEMS

function getAddCartButtons() {
  const addToCartBtnsArray = document.querySelectorAll(".add-to-cart-button-container")
  for (let i = 0; i < addToCartBtnsArray.length; i++) {
    const button = addToCartBtnsArray[i]
    button.addEventListener("click", getCartItemData)
  }
}

function getCartItemData(event) {
  const button = event.target
  const productCard = button.parentElement.parentElement.parentElement
  const imgSource = productCard.querySelector(".product-card > img").src
  const title = productCard.querySelector(".product-name").innerText
  const price = productCard.querySelector(".product-price").innerText
  
  addCartItem(title, imgSource, price)

}

function addCartItem(title, imgSource, price){
  const cartItem = document.createElement("section")
  cartItem.classList.add("list-item-container")
  const cartItemList = document.querySelector("#order-list-container")
  const cartItemContent = `<div class="list-item">
                                  <img class="product-img" src="${imgSource}" alt="${title}">
                                  <p>${title}</p>
                            </div>
                          <div class="item-price-container">
                              <p>${price}</p>
                              <img class="remove-order-item-icon" src="icons/icon_close.png" alt="close">
                          </div>`;
  cartItem.innerHTML = cartItemContent
  cartItemList.append(cartItem)
  cartItemList.querySelector(".remove-order-item-icon").addEventListener("click", removeCartItem)
  updateCartTotal()
  addRemoveButtonsListener()
}