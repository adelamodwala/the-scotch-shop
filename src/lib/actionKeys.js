import keyMirror from 'key-mirror';

export const productsActionTypes = keyMirror({
    FETCH_PRODUCTS_LIST_REQUEST: null,
    FETCH_PRODUCTS_LIST_SUCCESS: null,
    FETCH_PRODUCTS_LIST_FAILURE: null
});