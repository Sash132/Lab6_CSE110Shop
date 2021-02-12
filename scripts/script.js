// Script.js
window.addEventListener('DOMContentLoaded', () => {
  
  //fetches all data from an external website and stores it locally
  if(localStorage.getItem('products') === null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('products', JSON.stringify(data)));
  }
  
  let productsJSON = JSON.parse(localStorage.getItem('products'));
  let productsList = document.getElementById('product-list');

  //sets up 'cart' variable that will hold id's of products in case of page refresh
  if(localStorage.getItem('cart') == null) {
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  cart = JSON.parse(localStorage.getItem('cart'));
  
  //sets up 'cartSize' locally to hold num of products in cart in case of page refresh
  //sets up 'cartCount' variable that will update the cart-count span element
  let cartCount = document.getElementById('cart-count');
  if(localStorage.getItem('cartSize') == null) {
    localStorage.setItem('cartSize', JSON.stringify(cartCount.textContent));
  }
  cartCount.textContent = JSON.parse(localStorage.getItem('cartSize'));
  
  //iterates through all products and creates a product-item element for each of them
  for(var prod in productsJSON) {
    let inclusion = cart.includes(productsJSON[prod].id);
    let currProduct = new ProductItem(productsJSON[prod].image, productsJSON[prod].title, productsJSON[prod].price, inclusion, productsJSON[prod].id);
    productsList.appendChild(currProduct);
  }
  
});
