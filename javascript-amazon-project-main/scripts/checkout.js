import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
//import "../data/backend-practice.js";
import { loadproducts } from "../data/products.js";

loadproducts(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
