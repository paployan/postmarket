import { HYDRATE } from 'next-redux-wrapper';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };

    case actionTypes.COUNTER_INCRIMENT:
      return {
        count: state.count + 1,
      }; // Return new state

    case actionTypes.COUNTER_DECRIMENT:
      return {
        count: state.count - 1,
      }; // Return new state

    default: return state;
  }
};

export default reducer;
