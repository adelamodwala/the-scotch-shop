import {productsActionTypes} from '../../lib/actionKeys';

const initialState = {
  data: {}
};

export default function conversionReducer(state = initialState, action) {
    switch(action.type) {
        case productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS:
            return {
                ...state,
                data: action.payload.data
            };

        case productsActionTypes.FETCH_PRODUCTS_LIST_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };

        default:
            return {...state};
    }
}