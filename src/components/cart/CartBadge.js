import React, {Component} from 'react';
import {connect} from 'react-redux';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/action/shopping-cart';
import {Link} from 'react-router';

class CartBadge extends Component {
    render() {
        return (
            <div>
                <Badge
                    badgeContent={this.props.cartItemCount}
                    secondary={true}
                    badgeStyle={{top: 20, right: 23}}>
                    <Link to="/cart">
                        <IconButton tooltip="View Cart" iconStyle={{color: "white"}}>
                            <NotificationsIcon />
                        </IconButton>
                    </Link>
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