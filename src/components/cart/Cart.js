import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

import * as cartActions from '../../reducers/cart/cartActions';
import LinkToHome from '../home/LinkToHome';
import LinkToCheckout from './LinkToCheckout';

class Cart extends Component {

    removeItemFromCart(productId) {
        this.props.actions.removeItemFromCart(productId);
    }

    getCartItems() {
        let {cartItems, products} = this.props;
        let itemsRender = [];
        let total = 0;
        let cartProductIds = Object.keys(cartItems);

        if (cartProductIds.length > 0) {
            cartProductIds.map((cartItem, idx) => {
                let product = products[cartItem];
                let quantity = cartItems[cartItem];
                total += quantity * product.price_in_cents / 100.0;

                itemsRender.push(
                    <TableRow key={idx}>
                        <TableRowColumn>{product.name}</TableRowColumn>
                        <TableRowColumn>{"$" + product.price_in_cents / 100.0}</TableRowColumn>
                        <TableRowColumn>{quantity}</TableRowColumn>
                        <TableRowColumn style={{textAlign: "center"}}>
                            <FlatButton label="Remove"
                                        style={{color: "rgba(0,0,0,0.4)"}}
                                        onClick={() => this.removeItemFromCart(cartItem)}/>
                        </TableRowColumn>
                    </TableRow>
                );
            });

            // Add in the table footer for the total
            itemsRender.push(
                <TableRow key={cartProductIds.length} style={{fontWeight: "900"}}>
                    <TableRowColumn/>
                    <TableRowColumn style={{textAlign: "right"}}>
                        <span>Total</span>
                    </TableRowColumn>
                    <TableRowColumn>${total.toFixed(2)}</TableRowColumn>
                    <TableRowColumn style={{textAlign: "center"}}>
                        <LinkToCheckout/>
                    </TableRowColumn>
                </TableRow>
            );
        }

        return itemsRender;
    }

    render() {
        return (
            <div className="content-box" style={{marginTop: 20}}>
                <LinkToHome />
                <div style={{marginTop: 20}}>
                    <Table selectable={false}>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>Item</TableHeaderColumn>
                                <TableHeaderColumn>Price</TableHeaderColumn>
                                <TableHeaderColumn>Quantity</TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {this.getCartItems()}
                        </TableBody>
                    </Table>
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
    const {removeItemFromCart} = cartActions;
    const dispatchActions = bindActionCreators({removeItemFromCart}, dispatch);
    return {
        dispatch,
        actions: dispatchActions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);