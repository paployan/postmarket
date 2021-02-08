import { SET_SLIDER_ITEMS } from './actionTypes';

export const setSliderItems = (payload) => ({
  type: SET_SLIDER_ITEMS,
  payload,
});

export const fetchSliderItems = (locale) => (dispatch) => {
  return fetch(`${process.env.SERVER_URL}/api/sliders?locale=${locale}`)
    .then(res => res.json())
    .then(({ data }) => dispatch(setSliderItems(data)));
};
