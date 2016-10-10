import reducer from '../../src/reducers/products/productsReducer';
import {productsActionTypes} from '../../src/lib/actionKeys';

describe('products reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {}))
            .toEqual({
                data: {},
                fetchedProducts: false
            });
    });

    it('should handle FETCH_PRODUCTS_LIST_SUCCESS', () => {
       expect(
           reducer({
               data: {},
               fetchedProducts: false
           }, {
               type: productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
               payload: {
                   data: [{
                       name: "Product A",
                       product_no: "123456"
                   }, {
                       name: "Product B",
                       product_no: "123457"
                   }]
               }
           })
       ).toEqual({
           data: {
               "123456": {
                   name: "Product A",
                   product_no: "123456"
               },
               "123457": {
                   name: "Product B",
                   product_no: "123457"
               }
           },
           fetchedProducts: true
       });
    });
});