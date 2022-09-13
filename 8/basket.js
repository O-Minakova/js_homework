'use strict';

const basketCounterEl = document.querySelector('#basketCount');
const basketViewEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

basketCounterEl.textContent = 0;

document.querySelector('.cartIconWrap').addEventListener('click', () => {
  basketViewEl.classList.toggle('hidden');
});

const basket = new Map();

class Product {
  constructor(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }
}

document.querySelector('.featuredItems').addEventListener('click', e => {
  if (e.target.closest('.addToCartBtn')) {
    const featuredItem = e.target.closest('.featuredItem');
    const featuredItemId = +featuredItem.dataset.id;
    addToCart(
      featuredItemId,
      featuredItem.dataset.name,
      +featuredItem.dataset.price
    );
    basketCounterEl.textContent = getBasketCounter().toString();
    basketTotalValueEl.textContent = getBasketPrice().toFixed(2);
    renderProductInBasket(featuredItemId);
  }
});

function addToCart(id, name, price) {
  if (!basket.has(id)) {
    basket.set(id, new Product(name, price, 0));
  }
  basket.get(id).count++;
}

function getBasketCounter() {
  return [...basket.values()].reduce((acc, p) => acc + p.count, 0);
}

function getBasketPrice() {
  return [...basket.values()].reduce((acc, p) => acc + p.price * p.count, 0);
}

function renderProductInBasket(id) {
  const basketRowEl = basketViewEl.querySelector(`.basketRow[data-id="${id}"]`);
  if (!basketRowEl) {
    renderNewProductInBasket(id);
    return;
  }

  const product = basket.get(id);
  basketRowEl.querySelector('.productCount').textContent = product.count;
  basketRowEl.querySelector('.productTotalRow')
    .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(id) {
  const product = basket.get(id);
  const productRow = `
    <div class="basketRow" data-id="${id}">
      <div>${product.name}</div>
      <div>
        <span class="productCount">${product.count}</span> шт.
      </div>
      <div>$${product.price}</div>
      <div>
        $<span class="productTotalRow">${(product.price * product.count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

