import fetch from 'isomorphic-fetch';

import {productsActionTypes} from '../../lib/actionKeys';
import {LCBO_ACCESS_KEY} from '../../lib/constants';

export function fetchProductsListRequest() {
    return {
        type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST
    }
}

export function fetchProductsListSuccess(payload) {
    return {
        type: productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
        payload
    }
}

export function fetchProductsListFailure(payload) {
    return {
        type: productsActionTypes.FETCH_PRODUCTS_LIST_FAILURE,
        payload
    }
}

export function fetchProductsList() {
    return dispatch => {
        dispatch(fetchProductsListRequest());

        return fetch('https://lcboapi.com/products?q=scotch', {
            headers: {
                "Authorization": "Token " + LCBO_ACCESS_KEY
            }
        })
            .then((response) => {
                let json;
                if (response.ok) {
                    json = response.json();
                }
                else {
                    json = {"error": "There was an error retrieving the products"}
                }
                return json;
            })
            .then((json) => {
                if (typeof json == "object" && json.result) {
                    dispatch(fetchProductsListSuccess({
                        data: json.result
                    }));
                }
                else {
                    dispatch(fetchProductsListFailure(json));
                }
            });
    }
}