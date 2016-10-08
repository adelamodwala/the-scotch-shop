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

// Update item amount action creators
export function editItemAmount(productId, quantity) {
    return {
        type: cartActionTypes.EDIT_ITEM_AMOUNT,
        payload: {
            productId,
            quantity
        }
    }
}