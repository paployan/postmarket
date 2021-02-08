import * as actionTypes from './actionTypes';

export const counterIncriment = () => ({ type: actionTypes.COUNTER_INCRIMENT });
export const counterDecriment = () => ({ type: actionTypes.COUNTER_DECRIMENT });

// Example of the async actoins with redux-tunk
export const counterIncrimentAsync = () => (dispatch) => {
    return dispatch(counterIncriment())
};
