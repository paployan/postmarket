import { SET_CATEGORIES } from './actionTypes';

export const setItems = (payload) => ({
  type: SET_CATEGORIES,
  payload,
});

export const fetchCategoryItems = (locale) => (dispatch) => {
  return fetch(`${process.env.SERVER_URL}/api/categories?locale=${locale}`)
    .then(res => res.json())
    .then(({ data }) => dispatch(setItems(data)));
};
