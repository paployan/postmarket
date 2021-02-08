import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from './actionTypes';

export const setCartItem = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

export const removeCartItem = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});

export const clearCartItems = () => ({
  type: REMOVE_FROM_CART,
  payload: [],
});

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x.slug === product.slug) {
      let difference = Object.values(product.attributes).filter((v, i) => {
        if (i) {
          return !Object.values(x.attributes).includes(v);
        }
      });
      if (!difference.length) {
        alreadyExists = true;
        x.count += product.attributes.quantity;
      }
    }
  });
  if (!alreadyExists) {
    cartItems.push({
      ...product,
      count: product.attributes.quantity,
    });
  }
  dispatch(setCartItem(cartItems));
  if (process.browser) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
};

export const updateItemQuantity = (index, count) => (dispatch, getState) => {
  const items = getState()
    .cart.cartItems.slice().filter((x, i) => {
      if (i === index) {
        x.count = count;
      }
      return true;
    });
  dispatch(setCartItem(items));
  if (process.browser) {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
};

export const removeFromCart = (index) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice().filter((x, i) => i !== index);
  dispatch(removeCartItem(cartItems));
  if (process.browser) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
};

export const clearCart = () => (dispatch) => {
  if (process.browser) {
    localStorage.removeItem('cartItems');
  }
  dispatch(clearCartItems());
};
