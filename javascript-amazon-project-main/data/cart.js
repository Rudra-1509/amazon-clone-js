export let cart;
loadCart();

export function loadCart()
{
  cart = JSON.parse(localStorage.getItem('cart'));
if(!cart)
{
  cart=
  [
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
  ];
}
}

function saveToCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.cartQuantity += 1;
  } else {
    cart.push({
      productId: productId,
      cartQuantity: 1,
      deliveryOptionsID:'1'
    });
  }
  saveToCart();
}

export function deleteFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToCart();
}

export function updateDeliveryOption(productId, deliveryOptionsID)
{
  const targetItem= cart.find((item)=>item.productId === productId);
  targetItem.deliveryOptionsID=deliveryOptionsID;

  saveToCart();
}


export let products=[];
export function loadcart(fun)
 {
  const xhr= new XMLHttpRequest();

  xhr.addEventListener('load',()=>{
    console.log('load cart');
    fun();
  });
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
 }
