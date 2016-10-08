import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as cartActions from '../../reducers/cart/cartActions';
import LinkToHome from '../home/LinkToHome';
import CartItems from './CartItems';

class Cart extends Component {
    editItemAmount(productId, quantityRaw) {
        let quantity = parseInt(quantityRaw);
        if(quantity >= 0) {
            this.props.actions.editItemAmount(productId, quantity);
        }
    }

    render() {
        return (
            <div className="content-box" style={{marginTop: 20}}>
                <LinkToHome />
                <div style={{marginTop: 20}}>
                    <CartItems cartItems={this.props.cartItems}
                               products={this.props.products}
                               checkoutPage={false}
                               editItemAmount={(productId, quantity) => this.editItemAmount(productId, quantity)}/>
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

function mapDispatchToProps(dispatch) {
    const {editItemAmount} = cartActions;
    const dispatchActions = bindActionCreators({editItemAmount}, dispatch);
    return {
        dispatch,
        actions: dispatchActions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);