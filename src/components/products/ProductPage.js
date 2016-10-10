import React, {Component} from 'react';
import {Card, CardTitle, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import SnailLoader from '../common/SnailLoader';
import LinkToHome from '../home/LinkToHome';
import styleVariables from '../../lib/styleVariables.json';
import {capitalizeFirstLetter} from '../../lib/convert';

export default class ProductPage extends Component {

    constructor(props) {
        super(props);
        this.state = {openSnackBar: false, itemsAdded: 0}
    }

    handleAddToCart(addAmount) {
        addAmount = Math.max(addAmount, 0);
        if (addAmount > 0) {
            this.props.addItemToCart(addAmount);

            this.setState({
                openSnackBar: true,
                itemsAdded: addAmount
            });
        }
    }

    handleRequestClose() {
        this.setState({
            openSnackBar: false,
            itemsAdded: 0
        });
    }

    render() {
        let {product, fetchedProducts} = this.props;
        let renderChild;
        if (product === undefined && !fetchedProducts) {
            renderChild = (
                <div style={{
                    display: "flex",
                    flex: "1",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 30
                }}>
                    <SnailLoader />
                </div>
            );
        }
        else if (product === undefined && fetchedProducts) {
            renderChild = (
                <CardTitle className="no-product-message"
                           title="This product is unavailable.">
                </CardTitle>
            );
        }
        else {
            renderChild = (
                <div>
                    <div className="single-row">
                        <CardTitle
                            title={product.name}
                            style={{flex: 2}}
                        />
                        <CardTitle
                            title={"$" + product.price_in_cents / 100.0}
                            style={{flex: 1, display: "flex", textAlign: "right"}}
                            titleStyle={{width: "100%"}}
                        />
                    </div>
                    <div className="single-row" style={{padding: 16}}>
                        <CardMedia style={{width: 500}}>
                            <img src={product.image_url}/>
                        </CardMedia>
                        <CardText>
                            <div className="product-description">{capitalizeFirstLetter(product.tags)}.</div>
                            <CardActions
                                className="single-row"
                                style={{justifyContent: "flex-end", padding: 0, marginTop: 20}}>
                                <TextField ref="addAmount"
                                           floatingLabelText="Add..."
                                           defaultValue={1}
                                           type="number"
                                           style={{width: 60, marginRight: 20}}
                                           inputStyle={{textAlign: "right"}}/>
                                <RaisedButton backgroundColor={styleVariables.colors.themeBg}
                                              label="Add to Cart"
                                              onClick={() => this.handleAddToCart(parseInt(this.refs.addAmount.getValue()))}
                                              style={{marginRight: 0, position: "relative", height: 36, top: 30}}
                                              labelColor="white"/>
                            </CardActions>
                        </CardText>
                    </div>
                </div>
            );
        }
        return (
            <div className="content-box">
                <LinkToHome/>
                <Card style={{marginTop: 20}}>
                    {renderChild}
                </Card>
                <Snackbar
                    open={this.state.openSnackBar}
                    message={this.state.itemsAdded + " Items added to your cart"}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose.bind(this)}
                    style={{textAlign: "center"}}
                />
            </div>
        );
    }
}