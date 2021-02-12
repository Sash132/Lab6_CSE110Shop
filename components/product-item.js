// product-item.js

class ProductItem extends HTMLElement {
  constructor(image, title, price, checked, id) {
    super();
    this.attachShadow({mode: 'open'});  
    
    const listwr = document.createElement('li');
    listwr.setAttribute('class', 'product');
    
    //sets attributes for src, alt, width, title, and price
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
    
    //creates button and sets it to correct phrase
    const button = document.createElement('button');
    button.setAttribute('onclick', "alert('Added to Cart!')");
    button.textContent = 'Add to Cart';
    if(checked) {
      button.textContent = 'Remove from Cart';
    }
    listwr.appendChild(button);
    
    /* event listener that will take action if button is clicked
    * - updates the size of the cart and saves it locally in case of page refresh
    * - alternatingly swaps phrases for the button
    * - pushes/removes id's from a list that indicates which items have been added to cart in case of page refresh
    * - sends alert whenever an item has been added or removed from the cart.
    **/
    button.addEventListener("click", buttonChange);
    function buttonChange() {
      let cartSize = document.getElementById('cart-count');
      let cart = JSON.parse(localStorage.getItem('cart'));
      if(button.textContent == 'Add to Cart') {
        cartSize.textContent = parseInt(cartSize.textContent) + 1;
        button.textContent = 'Remove from Cart';
        cart.push(id);
        alert('Added to Cart!');
      }
      else {
        if(parseInt(cartSize.textContent) != 0) {
          cartSize.textContent = parseInt(cartSize.textContent) - 1;
        }
        button.textContent = 'Add to Cart';
        cart.splice(cart.indexOf(id), 1);
        alert('Removed from Cart!');
      }
      localStorage.setItem('cartSize', JSON.stringify(cartSize.textContent));
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    //sets up the CSS for the specific product
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
