import React, {Component} from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import LinkToCheckout from './LinkToCheckout';

export default class CartItems extends Component {
    getCartItems() {
        let {cartItems, products, checkoutPage} = this.props;
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
                        <TableRowColumn style={{overflow: "hidden"}}>{product.name}</TableRowColumn>
                        <TableRowColumn>{"$" + product.price_in_cents / 100.0}</TableRowColumn>
                        <TableRowColumn>
                            {checkoutPage ? quantity :
                                <TextField defaultValue={quantity}
                                           type="number"
                                           id={"input-" + cartItem}
                                           onChange={(e, quantity) => this.props.editItemAmount(cartItem, quantity)}
                                           style={{width: 60}}
                                           inputStyle={{textAlign: "right"}}/>
                            }
                        </TableRowColumn>
                        {checkoutPage ? null :
                            <TableRowColumn style={{textAlign: "center"}}>
                                <FlatButton label="Remove"
                                            style={{color: "rgba(0,0,0,0.4)"}}
                                            onClick={() => this.props.editItemAmount(cartItem, 0)}/>
                            </TableRowColumn>
                        }
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
                    {checkoutPage ? null :
                        <TableRowColumn style={{textAlign: "center"}}>
                            <LinkToCheckout/>
                        </TableRowColumn>
                    }
                </TableRow>
            );
        }

        return itemsRender;
    }

    render() {
        return(
            <Table selectable={false}>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Item</TableHeaderColumn>
                        <TableHeaderColumn>Price</TableHeaderColumn>
                        <TableHeaderColumn>Quantity</TableHeaderColumn>
                        {this.props.checkoutPage ? null : <TableHeaderColumn/>}
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.getCartItems()}
                </TableBody>
            </Table>
        );
    }
}