import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Card, CardTitle, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import SnailLoader from '../common/SnailLoader';

import {capitalizeFirstLetter} from '../../lib/convert';

class ProductPage extends Component {

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
                <div>
                    This product is unavailable.
                </div>
            );
        }
        else {
            renderChild = (
                <div>
                    <CardTitle
                        title={product.name}
                        subtitle={"$" + product.price_in_cents / 100.0}
                        subtitleStyle={{position: "absolute", right: 16, top: 16, fontSize: 26, color: "black"}}
                    />
                    <div style={{display: "flex", flex: 1, flexDirection: "row", padding: 16}}>
                        <CardMedia style={{width: 500}}>
                            <img src={product.image_url}/>
                        </CardMedia>
                        <CardText>
                            {capitalizeFirstLetter(product.tags)}.
                        </CardText>
                        <CardActions style={{display: 'flex', justifyContent: "center"}}>

                        </CardActions>
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Link style={{color: "white", textDecoration: "none"}}
                      to="/">
                    <FlatButton label="< Back To List"/>
                </Link>
                <Card style={{margin: 20}}>
                    {renderChild}
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const product = state.products.data.find(x => x.product_no == ownProps.params.productId);
    return {
        fetchedProducts: state.products.fetchedProducts,
        product
    };
};

export default connect(mapStateToProps)(ProductPage);