// Script.js
window.addEventListener('DOMContentLoaded', () => {
  
  if(localStorage.getItem('products') === null) {
    fetch('http://example.com/movies.json')
      .then(response => response.json())
      .then(data => localStorage.setItem('products', JSON.stringify(data)));
  }
  
  productsStr = localStorage.getItem('products');
  productsJSON = JSON.parse(productsStr);
  productsList = document.getElementByID('product-list');
  
  for(var prod in productsJSON) {
    currProduct = new ProductItem(productsJSON[prod].image, productsJSON[prod].title, productsJSON[prod].price);
    productsList.appendChild(currProduct);
  }
  
});
