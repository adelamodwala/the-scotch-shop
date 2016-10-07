import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

import styleVariables from '../../lib/styleVariables.json';

export default class ProductTile extends Component {
    render() {
        let {product} = this.props;
        return (
            <Card style={{paddingBottom: 12, margin: 5, width: 200, display: "flex", flexDirection: "column"}}>
                <CardHeader
                    title={product.name}
                    textStyle={{paddingRight: 0}}
                    subtitle={"$" + product.price_in_cents / 100.0}
                    style={{height: 100}}
                />
                <CardMedia>
                    <img src={product.image_thumb_url}/>
                </CardMedia>
                <CardActions style={{display: 'flex', justifyContent: "center"}}>
                    <Link style={{color: "white", textDecoration: "none"}}
                          to={`/products/${product.product_no}`}>
                        <RaisedButton backgroundColor={styleVariables.colors.themeBg}
                                      label="Details"
                                      labelColor="white"/>
                    </Link>
                </CardActions>
            </Card>
        );
    }
}