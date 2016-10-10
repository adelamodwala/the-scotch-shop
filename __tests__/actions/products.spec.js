import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import expect from 'expect';

import * as actions from '../../src/reducers/products/productsActions';
import {productsActionTypes} from '../../src/lib/actionKeys';
import {LCBO_ACCESS_KEY} from '../../src/lib/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async products actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('creates FETCH_PRODUCTS_LIST_SUCCESS when fetching products has been done', () => {
        nock("https://lcboapi.com", {
            reqheaders: {
                "Authorization": "Token " + LCBO_ACCESS_KEY
            }
        })
            .get("/products")
            .query({
                q: 'scotch'
            })
            .reply(200, {
                result: [{
                    name: "Some Product",
                    product_no: "123456"
                }]
            });

        const expectedActions = [
            {type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST},
            {
                type: productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
                payload: {
                    data: [{
                        name: "Some Product",
                        product_no: "123456"
                    }]
                }
            }
        ];
        let store = mockStore({
            products: {
                data: {}
            }
        });

        return store.dispatch(actions.fetchProductsList())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });

    it('creates FETCH_PRODUCTS_LIST_FAILRUE when there is a feed error', () => {
        nock("https://lcboapi.com", {
            reqheaders: {
                "Authorization": "Token " + LCBO_ACCESS_KEY
            }
        })
            .get("/products")
            .query({
                q: 'scotch'
            })
            .reply(404, {
                result: "Bad Request"
            });

        const expectedActions = [
            {type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST},
            {
                type: productsActionTypes.FETCH_PRODUCTS_LIST_FAILURE,
                payload: {
                    "error": "There was an error retrieving the products"
                }
            }
        ];
        let store = mockStore({
            products: {
                data: {}
            }
        });

        return store.dispatch(actions.fetchProductsList())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
    });
});