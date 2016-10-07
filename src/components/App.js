import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import styleVariables from '../lib/styleVariables.json';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productsActions from '../reducers/products/productsActions';

class App extends Component {
    componentDidMount() {
        console.log("MOUNTED HOME");
        let {products} = this.props;
        if(products.length == 0 ) {
            let {dispatch, actions} = this.props;
            dispatch(actions.fetchProductsList());
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="The Scotch Shop" iconClassNameRight="muidocs-icon-navigation-expand-more"
                                style={{backgroundColor: styleVariables.colors.themeBg, color: styleVariables.colors.primaryBgText}}/>
                        <div className="app-components">
                            {this.props.children}
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const products = state.products.data;
    return {
        products
    };
}

function mapDispatchToProps(dispatch) {
    let {fetchProductsList} = productsActions;
    const dispatchActions = bindActionCreators({fetchProductsList}, dispatch);
    return {
        dispatch,
        actions: dispatchActions
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);