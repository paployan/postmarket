import { HYDRATE } from 'next-redux-wrapper';
import {
  SET_PRODUCTS_FEATURED,
  SET_PRODUCTS_DISCOUNTED,
  SET_PRODUCT_ITEM,
  SET_PRODUCT_SIMILAR_ITEMS,
  SET_FILTERED_DATA,
} from '../actions/actionTypes';

const initialState = {
  item: {},
  items: [],
  featured: [],
  discounted: [],
  similarItems: [],
  filteredData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state, // use previous state
        ...action.payload.products, // apply delta from hydration
      };

    case SET_PRODUCTS_FEATURED:
      return {
        ...state,
        featured: action.payload,
      };

    case SET_PRODUCTS_DISCOUNTED:
      return {
        ...state,
        discounted: action.payload,
      };

    case SET_PRODUCT_ITEM:
      return {
        ...state,
        item: action.payload,
      }; // Return new state

    case SET_PRODUCT_SIMILAR_ITEMS:
      return {
        ...state,
        similarItems: action.payload,
      }; // Return new state

    case SET_FILTERED_DATA:
      return {
        ...state,
        filteredData: action.payload,
      }; // Return new state

    default:
      return state
  }
};

export default reducer;
