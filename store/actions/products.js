import {
  SET_PRODUCTS_FEATURED,
  SET_PRODUCTS_DISCOUNTED,
  SET_PRODUCT_ITEM,
  SET_PRODUCT_SIMILAR_ITEMS,
  SET_FILTERED_DATA,
} from './actionTypes';

export const setFeaturedItems = (payload) => ({
  type: SET_PRODUCTS_FEATURED,
  payload,
});

export const setDiscountedItems = (payload) => ({
  type: SET_PRODUCTS_DISCOUNTED,
  payload,
});

export const setItem = (payload) => ({
  type: SET_PRODUCT_ITEM,
  payload,
});

export const setSimilarItems = (payload) => ({
  type: SET_PRODUCT_SIMILAR_ITEMS,
  payload,
});


export const setFilteredData = (payload) => (dispatch) => {
  return dispatch({
    type: SET_FILTERED_DATA,
    payload,
  });
};

export const fetchFeaturedProducts = (locale, per_page = 6, currentPage = null) => (dispatch) => {
  let endpoint = `${process.env.SERVER_URL}/api/products/featured?locale=${locale}`;
  if (currentPage) {
    endpoint += `&page=${currentPage}`
  }
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ per_page }),
    })
      .then(res => res.json())
      .then((res) => dispatch(setFeaturedItems(res)));
};

export const fetchDiscountedProducts = (locale, per_page = 6, currentPage = 1) => (dispatch) => {
    return fetch(`${process.env.SERVER_URL}/api/products/discounted?page=${currentPage}&locale=${locale}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ per_page }),
    })
      .then(res => res.json())
      .then((res) => dispatch(setDiscountedItems(res)));
};

export const fetchProductItem = (locale, accessToken, slug) => (dispatch) => {
    return fetch(`${process.env.SERVER_URL}/api/products/${slug}?locale=${locale}`, {
      headers: {
        'access-token': accessToken
      }
    })
      .then(res => res.json())
      .then(({ data }) => dispatch(setItem(data)));
};

export const fetchProductSimiliarItems = (locale, accessToken, slug) => (dispatch) => {
    return fetch(`${process.env.SERVER_URL}/api/products/${slug}/similar?locale=${locale}`, {
      method: 'POST',
      headers: {
        'access-token': accessToken
      }
    })
      .then(res => res.json())
      .then(({ data }) => dispatch(setSimilarItems(data)));
};
