import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { orders,addorder } from "../../data/orders.js";

export function renderPaymentSummary() {
  const itemsTotal = calcItemsTotal();
  const shipCharge = getShipCharge();
  const beforeTax = itemsTotal + shipCharge;
  const tax = beforeTax * 0.1;
  const total = beforeTax + tax;

  let html = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(
              itemsTotal
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shipCharge
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              beforeTax
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;
  document.querySelector(".js-payment-summary").innerHTML = html;
   document.querySelector('.js-place-order').addEventListener('click',async () => {
    try{
      const response=await fetch("https://supersimplebackend.dev/orders", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          cart: cart,
        }),
      });
      const order=await response.json();
      addorder(order);
      
    }catch(error){
      console.log('Error occured.please try again later.')
    }
    window.location.href='orders.html';
  });
}

function calcItemsTotal() {
  let total = 0;
  cart.forEach((item) => {
    let targetProduct = products.find(
      (product) => item.productId === product.id
    );
    let price = item.cartQuantity * targetProduct.priceCents;
    total += price;
  });
  return total;
}

function getShipCharge() {
  let total = 0;
  cart.forEach((item) => {
    let targetDelOption = deliveryOptions.find(
      (deliveryOption) => deliveryOption.id === item.deliveryOptionsID
    );
    let price = targetDelOption.priceCents;
    total += price;
  });
  return total;
}
