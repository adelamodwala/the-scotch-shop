import React, {Component} from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import styleVariables from '../../lib/styleVariables';

export default class LinkToCheckout extends Component {
    render() {
        return(
            <Link style={{color: "white", textDecoration: "none", ...this.props.style}}
                  to="/checkout">
                <FlatButton label="Checkout" style={{color: styleVariables.colors.themeBg}}/>
            </Link>
        );
    }
}