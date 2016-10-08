import React, {Component} from 'react';
import {connect} from 'react-redux';

import CartItems from './CartItems';

class Checkout extends Component {
    render() {
        return (
            <div className="content-box" style={{marginTop: 20}}>
                <h1 style={{color: "rgba(0,0,0,0.6)"}}>Order Confirmed</h1>
                <div style={{marginTop: 20}}>
                    <CartItems cartItems={this.props.cartItems}
                               products={this.props.products}
                               checkoutPage={true}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const cartItems = state.cart.cartItems;
    const products = state.products.data;
    return {
        cartItems,
        products
    };
};

export default connect(mapStateToProps)(Checkout);