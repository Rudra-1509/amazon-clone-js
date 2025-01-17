import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
// import "../data/cart-oop.js";
// import "../data/cart-class.js";
//import "../data/backend-practice.js";
import { loadproducts, loadproductsfetch } from "../data/products.js";
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
/*
Promise.all([
  new Promise((resolve) => {
    loadproductsfetch(() => {
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
*/

async function loadpage() {
  try{
    //throw 'error1';
    await loadproductsfetch();

  await new Promise((resolve,reject) => {
    //throw 'error2';
    loadcart(() => {
      resolve();
      //reject('error3');
    });
  });
  }
  catch(error){
    console.log(error);
    console.log("error occured.Please try again later.");
  }
  
  renderOrderSummary();
  renderPaymentSummary();
}

loadpage();