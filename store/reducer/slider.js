import { HYDRATE } from 'next-redux-wrapper';
import { SET_SLIDER_ITEMS } from '../actions/actionTypes';

const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state, // use previous state
        ...action.payload.slider, // apply delta from hydration
      };

    case SET_SLIDER_ITEMS:
      return {
        items: action.payload,
      }; // Return new state

    default: return state;
  }
};

export default reducer;
