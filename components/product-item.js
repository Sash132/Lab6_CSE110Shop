// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    const listwr = document.createElement('li');
    listwr.setAttribute('class', 'product');
    
    
  }
}

customElements.define('product-item', ProductItem);
