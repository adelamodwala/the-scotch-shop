import { combineReducers } from 'redux';
import {default as products} from './products/productsReducer';

/**
 * Export our root reducer
 * @param  {Object-Reducer} {auth reducer}
 * @return {Object-Reducer} root reducer
 */
export default combineReducers({
	products
});
