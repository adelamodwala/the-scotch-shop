import {productsActionTypes} from '../../lib/actionKeys';

const initialState = {
    data: {},
    fetchedProducts: false
};

export default function conversionReducer(state = initialState, action) {
    switch (action.type) {
        case productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS:
            let dataObj = {};
            action.payload.data.map((item) => {
               dataObj[item.product_no] = item;
            });
            return {
                ...state,
                data: dataObj,
                fetchedProducts: true
            };

        case productsActionTypes.FETCH_PRODUCTS_LIST_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                fetchedProducts: true
            };

        default:
            return {...state};
    }
}