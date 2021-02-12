// Script.js
window.addEventListener('DOMContentLoaded', () => {
  
  if(localStorage.getItem('products') === null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('products', JSON.stringify(data)));
  }
  
  let productsJSON = JSON.parse(localStorage.getItem('products'));
  let productsList = document.getElementById('product-list');

  if(localStorage.getItem('cart') == null) {
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  cart = JSON.parse(localStorage.getItem('cart'));
  
  let cartCount = document.getElementById('cart-count');
  if(localStorage.getItem('cartSize') == null) {
    localStorage.setItem('cartSize', JSON.stringify(cartSize.textContent));
  }
  cartSize = JSON.parse(localStorage.getItem('cartSize'));
  cartCount.textContent = cartSize;
  
  for(var prod in productsJSON) {
    let inclusion = cart.includes(productsJSON[prod].id);
    let currProduct = new ProductItem(productsJSON[prod].image, productsJSON[prod].title, productsJSON[prod].price, inclusion, productsJSON[prod].id);
    productsList.appendChild(currProduct);
  }
  
});
