import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
require("./styles/style.scss");

import App from './components/App';
import Home from './components/home/Home';
import ProductPageContainer from './components/products/ProductPageContainer';
import Cart from './components/cart/Cart';
import Checkout from './components/cart/Checkout';
import configureStore from './store/configureStore';

const store = configureStore();
injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="/products/:productId" component={ProductPageContainer}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/checkout" component={Checkout}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
