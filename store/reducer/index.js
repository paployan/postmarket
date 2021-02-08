import { combineReducers } from 'redux';
import accountReducer from './account';
import cartReducer from './cart';
import categoriesReducer from './categories';
import productsReducer from './products';
import sliderReducers from './slider';

const rootReducer = combineReducers({
  account: accountReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  products: productsReducer,
  slider: sliderReducers,
});

export default rootReducer;
