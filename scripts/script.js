// Script.js
window.addEventListener('DOMContentLoaded', () => {
  
  if(localStorage.getItem('products') === null) {
    fetch('http://example.com/movies.json')
      .then(response => response.json())
      .then(data => localStorage.setItem('products', JSON.stringify(data)));
  }
  
});
