import React from 'react'

    document.addEventListener('DOMContentLoaded', () => {
      const items = {
        pizza: 0,
        burger: 0,
        pasta: 0
      };

      const updateQuantity = (item) => {
        document.getElementById(`${item}-qty).textContent = items[item]`);
      };

      document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
          const item = button.getAttribute('data-item');
          items[item]++;
          updateQuantity(item);
        });
      });

      document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
          const item = button.getAttribute('data-item');
          if (items[item] > 0) {
            items[item]--;
          }
          updateQuantity(item);
        });
      });
    });
export default function Menu() {
  return (
    <div>
      <div className="menu">
    <h1>Food Menu</h1>
    <ul id="menu-items">
      <li>
        <span>Pizza</span>
        <button className="decrease" data-item="pizza">-</button>
        <span id="pizza-qty" className="qty">0</span>
        <button className="increase" data-item="pizza">+</button>
      </li>
      <li>
        <span>Burger</span>
        <button className="decrease" data-item="burger">-</button>
        <span id="burger-qty" className="qty">0</span>
        <button className="increase" data-item="burger">+</button>
      </li>
      <li>
        <span>Pasta</span>
        <button className="decrease" data-item="pasta">-</button>
        <span id="pasta-qty" className="qty">0</span>
        <button className="increase" data-item="pasta">+</button>
      </li>
    </ul>
  </div>
    </div>
  )
}
// export default Menu;