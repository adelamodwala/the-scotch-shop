import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class ProductTile extends Component {
    render() {
        let {product} = this.props;
        return (
            <Card style={{margin: 5, width: 300}} >
                <CardHeader
                    title={product.name}
                    subtitle={product.origin}
                />
                <CardMedia>
                    <img src={product.image_url}/>
                </CardMedia>
                <CardText >
                    {product.alcohol_content / 100.0}% ${product.price_in_cents / 100.0}
                </CardText>
                <CardActions>
                    <FlatButton label="Details"/>
                </CardActions>
            </Card>
        );
    }
}