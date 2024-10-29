import { renderOrderSummary } from "../../scripts/checkout/ordersummary.js";
import { loadCart,cart } from "../../data/cart.js";


describe('Test Suite: renderOrderSummary',()=>{
    it('Displays the cart',()=>{
        document.querySelector('.js-test-container').innerHTML=
            `<div class="js-order-summary"></div>`;
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                cartQuantity: 1,
                deliveryOptionsID:'1'
                },
                {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                cartQuantity: 2,
                deliveryOptionsID:'2'
                },
            ]);
        });
        loadCart();
        console.log(cart);
        console.log('hi');
        renderOrderSummary();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d`).innerText)
            .toContain(`Quantity: 1`);
            expect(document.querySelector(`.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6`).innerText)
            .toContain(`Quantity: 2`);
    });
});