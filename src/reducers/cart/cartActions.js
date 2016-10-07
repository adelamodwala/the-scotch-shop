import {cartActionTypes} from '../../lib/actionKeys';


// Add item action creators
export function addItemToCart(productId, addAmount) {
    return {
        type: cartActionTypes.ADD_ITEM_TO_CART,
        payload: {
            productId,
            addAmount
        }
    }
}