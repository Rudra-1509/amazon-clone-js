export let cart = [
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    cartQuantity: 1,
  },
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    cartQuantity: 2,
  },
];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }
}

export function deleteFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
}
