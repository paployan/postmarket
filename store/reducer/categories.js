import { HYDRATE } from 'next-redux-wrapper';
import { SET_CATEGORIES } from '../actions/actionTypes';

const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state, // use previous state
        ...action.payload.categories, // apply delta from hydration
      };

    case SET_CATEGORIES:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state
  }
};

export default reducer;
