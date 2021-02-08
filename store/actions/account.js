import { ACCOUNT_ORDERS, ACCOUNT_WISHLIST } from './actionTypes';

export const setOrders = (payload) => ({
  type: ACCOUNT_ORDERS,
  payload,
});

export const setWishlist = (payload) => ({
  type: ACCOUNT_WISHLIST,
  payload,
});

export const getOrders = (accessToken, currentPage, locale) => (dispatch) => {
  return fetch(`${process.env.SERVER_URL}/api/account/orders?page=${currentPage}&locale=${locale}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'access-token': accessToken,
    },
  }).then(res => res.json())
    .then((res) => dispatch(setOrders(res)));
};

export const getWishlist = (locale, accessToken, currentPage) => (dispatch) => {
  return fetch(`${process.env.SERVER_URL}/api/wishlist?page=${currentPage}&locale=${locale}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'access-token': accessToken,
    },
  }).then(res => res.json())
    .then((res) => dispatch(setWishlist(res)));
};
  
export const removeFromWishlist = (slug) => (dispatch) => {
  return fetch(`/api/wishlist/${slug}/store`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ withResult: true }),
  }).then(res => res.json())
    .then((res) => dispatch(setWishlist(res)));
};

  