// Script.js
window.addEventListener('DOMContentLoaded', () => {
  
  if(localStorage.getItem('products') === null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('products', JSON.stringify(data)));
  }
  
  productsJSON = JSON.parse(localStorage.getItem('products'));
  productsList = document.getElementById('product-list');
  
  for(var prod in productsJSON) {
    currProduct = new ProductItem(productsJSON[prod].image, productsJSON[prod].title, productsJSON[prod].price);
    productsList.appendChild(currProduct);
  }
  
});
