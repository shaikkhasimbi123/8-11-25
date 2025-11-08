import { books } from './books.js';

const bookList = document.getElementById('book-list');
const cart = document.getElementById('cart');

let cartItems = [];

// Function to render book list
function renderBooks() {
  bookList.innerHTML = ''; // Clear list
  books.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.innerHTML = `
      <strong>${book.name}</strong> - $${book.price.toFixed(2)}
      <button data-sku="${book.sku}">Add to Cart</button>
    `;
    bookList.appendChild(bookDiv);
  });
}

// Function to render cart
function renderCart() {
  if (cartItems.length === 0) {
    cart.innerHTML = '<em>Cart is empty</em>';
    return;
  }
  cart.innerHTML = '';
  cartItems.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} x ${item.qty} - $${(item.price * item.qty).toFixed(2)}`;
    cart.appendChild(div);
  });
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  cart.appendChild(totalDiv);
}

// Add book to cart
function addToCart(sku) {
  const book = books.find(b => b.sku === sku);
  if (!book) return;
  const existing = cartItems.find(item => item.sku === sku);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({...book});
  }
  renderCart();
}

renderBooks();
renderCart();

// Event delegation for add to cart buttons
bookList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    addToCart(e.target.dataset.sku);
  }
});
