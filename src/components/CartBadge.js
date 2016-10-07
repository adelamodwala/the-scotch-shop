import React, {Component} from 'react';
import {connect} from 'react-redux';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/action/shopping-cart';

class CartBadge extends Component {
    render() {
        return(
            <div>
                <Badge
                    badgeContent={this.props.cartItemCount}
                    secondary={true}
                    badgeStyle={{top: 15, right: 15}}
                >
                    <IconButton tooltip="Cart">
                        <NotificationsIcon />
                    </IconButton>
                </Badge>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const cartItemCount = state.cart.cartItemCount;
    return {
        cartItemCount
    };
}


export default connect(mapStateToProps)(CartBadge);