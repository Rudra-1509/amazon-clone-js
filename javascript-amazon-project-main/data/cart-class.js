class Cart {
    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;        
        this.loadCart();
    }
  
    loadCart() {
      this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
      if (!this.cartItems) {
        this.cartItems = [
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
        ];
      }
    }
  
    saveToCart() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }
  
    addToCart(productId) {
      let matchingItem;
  
      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
  
      if (matchingItem) {
        matchingItem.cartQuantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          cartQuantity: 1,
          deliveryOptionsID: "1",
        });
      }
      this.saveToCart();
    }
  
    deleteFromCart(productId) {
      let newCart = [];
  
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToCart();
    }
  
    updateDeliveryOption(productId, deliveryOptionsID) {
      const targetItem = this.cartItems.find(
        (item) => item.productId === productId
      );
      if (targetItem) {
        targetItem.deliveryOptionsID = deliveryOptionsID;
      }
  
      this.saveToCart();
    }
  }
  
  const cart = new Cart('cart-oop');
  const businessCart = new Cart('business-cart');
  

  console.log(cart);
  console.log(businessCart);
  