import React, {Component} from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';

export default class LinkToHome extends Component {
    render() {
        return(
            <Link style={{color: "white", textDecoration: "none"}}
                  to="/">
                <FlatButton label="< Back To Products" style={{marginTop: 20, color: "rgba(0,0,0,0.4)"}}/>
            </Link>
        );
    }
}