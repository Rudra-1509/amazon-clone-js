import { cart, deleteFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { renderPaymentSummary } from "./paymentsummary.js";

export function renderOrderSummary()
{
let cartSummaryHtml = "";
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct = products.find((product) => product.id === productId);
  let cartOptionID=cartItem.deliveryOptionsID;
  let matchingOption= deliveryOptions.find((item)=>(cartOptionID===item.id));
  const today=dayjs();
  const deliveryDate=(today.add(matchingOption.deliveryDay,'days')).format("ddd, MMM D");
  cartSummaryHtml += `<div class="
            cart-item-container 
            js-cart-item-container
            js-container-${cartItem.productId}">
            <div class="delivery-date">
              Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">
                      ${cartItem.cartQuantity}
                    </span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity js-delete-test-${matchingProduct.id}"
                   data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHtml(cartItem,matchingProduct)}
              </div>
            </div>
          </div>`;
});

function deliveryOptionsHtml(cartItem,matchingProduct) {
  let totalHtml = "";
  deliveryOptions.forEach((item) => {
    const today = dayjs();
    const deliveryDate = today.add(item.deliveryDay, "days");
    const dateString = deliveryDate.format("ddd, MMM D");
    const deliveryCost =
      item.priceCents === 0 ? "FREE" : `$${(item.priceCents / 100).toFixed(2)}-`;
      const ischecked= item.id===cartItem.deliveryOptionsID;
    totalHtml += `
      <div class="delivery-option js-delivery-option" 
      data-product-id="${matchingProduct.id}"
      data-delivery-optionsid="${item.id}"
      >
        <input type="radio" 
        ${(ischecked)?'checked':''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${deliveryCost} Shipping
          </div>
        </div>
      </div>
    `;
  });

  return totalHtml;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

document.querySelectorAll(".js-delete-quantity").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    deleteFromCart(productId);
    const container = document.querySelector(`.js-container-${productId}`);
    container.remove();
    renderPaymentSummary();
  });
});

document.querySelectorAll('.js-delivery-option').forEach(
  (item)=>{
    const productId=item.dataset.productId
    const deliveryOptionsID=item.dataset.deliveryOptionsid;
    item.addEventListener('click',()=>{
      updateDeliveryOption(productId,deliveryOptionsID);
      renderOrderSummary();
      renderPaymentSummary();
    });
  }
);

}
