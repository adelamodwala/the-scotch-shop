import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as cartActions from '../../reducers/cart/cartActions';
import ProductPage from './ProductPage';

export class ProductPageContainer extends Component {

    addItemToCart(addAmount) {
        let {actions, productId} = this.props;
        actions.addItemToCart(productId, addAmount);
    }

    render() {
        return (
            <ProductPage product={this.props.product}
                         productId={this.props.productId}
                         fetchedProducts={this.props.fetchedProducts}
                         addItemToCart={(addAmount) => this.addItemToCart(addAmount)}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const productId = ownProps.params.productId;
    const product = state.products.data[productId];
    return {
        fetchedProducts: state.products.fetchedProducts,
        productId,
        product
    };
};

function mapDispatchToProps(dispatch) {
    let {addItemToCart} = cartActions;
    const dispatchActions = bindActionCreators({addItemToCart}, dispatch);
    return {
        dispatch,
        actions: dispatchActions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPageContainer);