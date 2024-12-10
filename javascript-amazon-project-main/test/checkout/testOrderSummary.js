import { renderOrderSummary } from "../../scripts/checkout/ordersummary.js";
import { loadCart, cart } from "../../data/cart.js";
import { loadproducts, loadproductsfetch } from "../../data/products.js";

describe("Test Suite: renderOrderSummary", () => {
  beforeAll((done) => {
    loadproductsfetch().then(() => {
      done();
    });
  });

  beforeEach(() => {
    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>`;
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          cartQuantity: 1,
          deliveryOptionsID: "1",
        },
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          cartQuantity: 2,
          deliveryOptionsID: "2",
        },
      ]);
    });
    loadCart();

    renderOrderSummary();
  });
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = ``;
  });
  it("Displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(
        `.js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d`
      ).innerText
    ).toContain(`Quantity: 1`);
    expect(
      document.querySelector(
        `.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6`
      ).innerText
    ).toContain(`Quantity: 2`);
  });

  it("Removes a product", () => {
    document
      .querySelector(`.js-delete-test-15b6fc6f-327a-4ec4-896f-486349e85a3d`)
      .click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(
        ".js-container-15b6fc6f-327a-4ec4-896f-486349e85a3d"
      )
    ).toEqual(null);
    expect(
      document.querySelector(
        ".js-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
      )
    ).not.toEqual(null);
  });
});
