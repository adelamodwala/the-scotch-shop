import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import SnailLoader from '../common/SnailLoader';
import ProductTile from '../products/ProductTile';

class Home extends Component {

    getProductsList() {
        let products = this.props.products;
        let productsRender = [];

        Object.keys(products).map((productId, idx) => {
            productsRender.push(
                <ProductTile key={idx} product={products[productId]}/>
            );
        });

        return productsRender;
    }

    render() {
        let homeClass = classNames({
            'home-container': true,
            'content-box': true
        });
        let products = this.props.products;

        return (
            <div className={homeClass} style={{
                padding: 10,
                display: "flex",
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                flexFlow: "wrap"
            }}>
                {Object.keys(products).length > 0 ? this.getProductsList() : <SnailLoader/>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const products = state.products.data;
    return {
        products
    };
}

export default connect(mapStateToProps)(Home);