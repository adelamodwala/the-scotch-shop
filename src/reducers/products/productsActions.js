import {getFetch, postFetch} from '../../lib/api';
import {productsActionTypes} from '../../lib/actionKeys';

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
    return (dispatch, getState) => {
        dispatch(fetchProductsListRequest());
        return sendFetchProductsListRequest();
    }
}

function sendFetchProductsListRequest() {
    return (dispatch) => {
        let ACCESS_KEY = "MDo4Mjg3MDljOC04YjZhLTExZTYtOWVkNC00ZmIyNjBmZDA0MWY6a0xDbElDU3lJdXVLVUhKR3BmN0ZrTUpWRTFLSnc3TU5HOEF6";
        let opts = {
            host: 'https://lcboapi.com',
            endpoint: '/products?q=scotch',
            headers: {
                "Authorization": "Token " + ACCESS_KEY
            }
        };

        return getFetch(opts)
            .then((response) => {
                let json;
                if (response.ok) {
                    json = response.json();
                }
                else {
                    console.log(response);
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
                    console.log(json);
                    dispatch(fetchProductsListFailure(json));
                }
            });
    }
}