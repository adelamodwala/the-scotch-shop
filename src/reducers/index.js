import { combineReducers } from 'redux';
import {default as products} from './products/productsReducer';
import {default as cart} from './cart/cartReducer'

/**
 * Export our root reducer
 * @param  {Object-Reducer} {auth reducer}
 * @return {Object-Reducer} root reducer
 */
export default combineReducers({
	products,
	cart
});
