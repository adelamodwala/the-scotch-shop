import {postFetch} from '../../lib/api';
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

export function fetchProductsListFailure() {
    return {
        type: productsActionTypes.FETCH_PRODUCTS_LIST_FAILURE
    }
}

export function fetchProductsList() {
    (dispatch, getState) => {
        dispatch(fetchProductsListRequest());
        let opts = {
            endpoint: 'https://lcboapi.com/products',
            headers: {
                "Authorization": "Token MDoyOTY1ZDAyNi04YjU3LTExZTYtOGU4Ny00YjMwNGQwMjY1Nzc6WDlibXZ5Sk1LM1lhaFlwd1hBYW1qR0w0TG9LUVJoUmY2dnB2"
            }
        };

        return postFetch(opts)
            .then((response) => {
                let json;
                debugger;
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
                if (typeof json == "string") {
                    dispatch(fetchProductsListSuccess(json));
                }
                else {
                    console.log(json);
                    dispatch(fetchProductsListFailure());
                }
            });
    }
}