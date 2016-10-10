import * as actions from '../../src/reducers/cart/cartActions';
import {cartActionTypes} from '../../src/lib/actionKeys';

describe('actions', () => {
    it('should create an action to add an item to the cart', () => {
       const productId = "54640";
        const addAmount = 1;
        const expectedAction = {
            type: cartActionTypes.ADD_ITEM_TO_CART,
            payload: {
                productId,
                addAmount
            }
        };

        expect(actions.addItemToCart("54640", 1)).toEqual(expectedAction);
    });

    it('should create an action to edit an items quantity in the cart', () => {
        const productId = "54640";
        const quantity = 4;
        const expectedAction = {
            type: cartActionTypes.EDIT_ITEM_AMOUNT,
            payload: {
                productId,
                quantity
            }
        };

        expect(actions.editItemAmount("54640", 4)).toEqual(expectedAction);
    });
});