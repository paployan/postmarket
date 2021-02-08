import { HYDRATE } from 'next-redux-wrapper';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../actions/actionTypes';

const initialState = {
  cartItems: process.browser ?
    JSON.parse(localStorage.getItem('cartItems') || '[]')
    : [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state, // use previous state
        ...action.payload.cartItems, // apply delta from hydration
      };

    case ADD_TO_CART:
      return {
        cartItems: action.payload,
      };

    case REMOVE_FROM_CART:
      return {
        cartItems: action.payload,
      }; // Return new state

    default:
      return state
  }
};

export default reducer;
