import { HYDRATE } from 'next-redux-wrapper';
import { ACCOUNT_ORDERS, ACCOUNT_WISHLIST } from '../actions/actionTypes';

const initialState = {
  orderHistory: null,
  wishlist: null,
};
  
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state, // use previous state
                orderHistory: action.payload.account.orderHistory, // apply delta from hydration
                wishlist: action.payload.account.wishlist,
            };

        case ACCOUNT_ORDERS:
            return {
                orderHistory: action.payload,
            };
        
        case ACCOUNT_WISHLIST:
            return {
                wishlist: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;