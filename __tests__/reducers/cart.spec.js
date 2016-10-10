import reducer from '../../src/reducers/cart/cartReducer';
import {cartActionTypes} from '../../src/lib/actionKeys';

describe('cart reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {}))
            .toEqual({
                cartItemCount: 0,
                cartItems: {}
            });
    });

    it('should handle ADD_ITEM_TO_CART', () => {
       expect(reducer(
           {
               cartItemCount: 0,
               cartItems: {}
           }, {
               type: cartActionTypes.ADD_ITEM_TO_CART,
               payload: {
                   productId: "123456",
                   addAmount: 2
               }
           }
       )).toEqual({
           cartItemCount: 2,
           cartItems: {
               "123456": 2
           }
       });
    });

    it('should add a new product to the cart for ADD_ITEM_TO_CART', () => {
        expect(reducer(
            {
                cartItemCount: 2,
                cartItems: {
                    "123456": 2
                }
            }, {
                type: cartActionTypes.ADD_ITEM_TO_CART,
                payload: {
                    productId: "123457",
                    addAmount: 3
                }
            }
        ))
            .toEqual({
                cartItemCount: 5,
                cartItems: {
                    "123456": 2,
                    "123457": 3
                }
            });
    });

    it('should add quantity to existing item for ADD_ITEM_TO_CART', () => {
        expect(reducer(
            {
                cartItemCount: 5,
                cartItems: {
                    "123456": 2,
                    "123457": 3
                }
            }, {
                type: cartActionTypes.ADD_ITEM_TO_CART,
                payload: {
                    productId: "123456",
                    addAmount: 3
                }
            }
        ))
            .toEqual({
                cartItemCount: 8,
                cartItems: {
                    "123456": 5,
                    "123457": 3
                }
            });
    });

    it('should set quantity from existing item for EDIT_ITEM_AMOUNT', () => {
        expect(reducer(
            {
                cartItemCount: 5,
                cartItems: {
                    "123456": 2,
                    "123457": 3
                }
            }, {
                type: cartActionTypes.EDIT_ITEM_AMOUNT,
                payload: {
                    productId: "123456",
                    quantity: 1
                }
            }
        ))
            .toEqual({
                cartItemCount: 4,
                cartItems: {
                    "123456": 1,
                    "123457": 3
                }
            });
    });

    it('should delete an existing item for set quantity 0 for EDIT_ITEM_AMOUNT', () => {
        expect(reducer(
            {
                cartItemCount: 5,
                cartItems: {
                    "123456": 2,
                    "123457": 3
                }
            }, {
                type: cartActionTypes.EDIT_ITEM_AMOUNT,
                payload: {
                    productId: "123456",
                    quantity: 0
                }
            }
        ))
            .toEqual({
                cartItemCount: 3,
                cartItems: {
                    "123457": 3
                }
            });
    });
});