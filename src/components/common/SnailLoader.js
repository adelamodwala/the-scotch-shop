import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styleVariables from '../../lib/styleVariables.json';

export default class SnailLoader extends Component {
    render() {
        return (
            <CircularProgress size={30} thickness={3} color={styleVariables.colors.floater} />
        );
    }
}