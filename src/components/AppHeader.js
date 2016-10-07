import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

import styleVariables from '../lib/styleVariables.json';
import CartBadge from './CartBadge';

export default class AppHeader extends Component {
    render() {
        return(
            <AppBar title="The Scotch Shop"
                    showMenuIconButton={false}
                    iconElementRight={<CartBadge/>}
                    iconStyleRight={{height: 56, marginTop: -6, marginRight: 0}}
                    style={{backgroundColor: styleVariables.colors.themeBg, color: styleVariables.colors.primaryBgText}}/>
        );
    }
}