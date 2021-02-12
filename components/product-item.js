// product-item.js

class ProductItem extends HTMLElement {
  constructor(image, title, price, checked, id) {
    super();
    this.attachShadow({mode: 'open'});  
    
    const listwr = document.createElement('li');
    listwr.setAttribute('class', 'product');
    
    const imageAcc = document.createElement('img');
    const pTitle = document.createElement('p');
    const pPrice = document.createElement('p');
    imageAcc.setAttribute('src', image);
    imageAcc.setAttribute('alt', title);
    imageAcc.setAttribute('width', 200);
    pTitle.textContent = title;
    pPrice.textContent = "$" + price;
    pTitle.setAttribute('class', 'title');
    pPrice.setAttribute('class', 'price');
    listwr.appendChild(imageAcc);
    listwr.appendChild(pTitle);
    listwr.appendChild(pPrice);
    
    const button = document.createElement('button');
    button.textContent = 'Add to Cart';
    if(checked) {
      button.textContent = 'Remove from Cart';
    }
    listwr.appendChild(button);
    
    button.addEventListener("click", buttonChange);
    
    function buttonChange() {
      let cartSize = JSON.parse(localStorage.getItem('cartSize'));
      let cart = JSON.parse(localStorage.getItem('cart'));
      if(button.textContent == 'Add to Cart') {
        cartSize.textContent = parseInt(cartSize.textContent) + 1;
        button.textContent = 'Remove from Cart';
        cart.push(id);
      }
      else {
        cartSize.textContent = parseInt(cartSize.textContent) - 1;
        button.textContent = 'Add to Cart';
        cart.splice(cart.indexOf(id), 1);
      }
      localStorage.setItem('cartSize', JSON.stringify(cartSize));
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    this.shadowRoot.innerHTML = `
    <style>
        .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }

      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }

      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }

      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }

      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }

      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }
    </style>`;
    
    this.shadowRoot.append(listwr);
  }
}

customElements.define('product-item', ProductItem);
