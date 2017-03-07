import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import throttle from 'lodash/throttle';
import injectTapEventPlugin from 'react-tap-event-plugin';
require("./styles/style.scss");

import {loadState, saveState} from './lib/localStorage';
import App from './components/App';
import Home from './components/home/Home';
import ProductPageContainer from './components/products/ProductPageContainer';
import Cart from './components/cart/Cart';
import Checkout from './components/cart/Checkout';
import configureStore from './store/configureStore';

const store = configureStore(loadState());
injectTapEventPlugin();

// Throttling allows us to persist at most once per second
store.subscribe(throttle(() => {
    saveState(store.getState());
}), 1001);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
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
