import {cartActionTypes} from '../../lib/actionKeys';

const initialState = {
    cartItemCount: 0,
    cartItems: {}
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case cartActionTypes.ADD_ITEM_TO_CART:
            let newCart = {...state.cartItems};
            let {productId, addAmount} = action.payload;


            if (newCart[productId] != undefined) {
                newCart[productId] += addAmount;
            }
            else {
                newCart[productId] = addAmount;
            }
            return {
                ...state,
                cartItems: newCart,
                cartItemCount: state.cartItemCount + addAmount
            };

        case cartActionTypes.EDIT_ITEM_AMOUNT:
            let updatedCart = {...state.cartItems};
            let productID = action.payload.productId;
            let {quantity} = action.payload;
            let quantityInCart = state.cartItemCount - updatedCart[productID] + quantity;

            if(quantity === 0) {
                delete updatedCart[productID];
            }
            else {
                updatedCart[productID] = quantity;
            }

            return {
                ...state,
                cartItems: updatedCart,
                cartItemCount: quantityInCart
            };

        default:
            return {...state};
    }
}