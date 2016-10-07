import {cartActionTypes} from '../../lib/actionKeys';

const initialState = {
    cartItemCount: 0,
    cartItems: {}
};

export default function cartReducer(state = initialState, action) {
    switch(action.type) {
        case cartActionTypes.ADD_ITEM_TO_CART:
            let newCart = {...state.cartItems};
            let {productId, addAmount} = action.payload;


            if(newCart[productId] != undefined) {
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

        default:
            return {...state};
    }
}