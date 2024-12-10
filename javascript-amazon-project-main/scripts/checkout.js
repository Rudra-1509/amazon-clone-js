import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
//import "../data/backend-practice.js";
import { loadproducts } from "../data/products.js";
import { loadcart } from "../data/cart.js";
/*
new Promise((resolve) => {
  loadproducts(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
loadproducts(() => {
  loadcart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});*/
/*
new Promise((resolve) => {
  loadproducts(() => {
    resolve();
  });
})
  .then(() => {
    return new Promise((resolve) => {
      loadcart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
*/
Promise.all([
  new Promise((resolve) => {
    loadproducts(() => {
      resolve(20);
    });
  }),
  new Promise((resolve) => {
    loadcart(() => {
      resolve(30);
    });
  }),
]).then((values) => {
  console.log(values);  
  renderOrderSummary();
  renderPaymentSummary();
});
