import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as productsActions from '../reducers/products/productsActions';
import AppHeader from './AppHeader';

class App extends Component {
    componentDidMount() {
        console.log("MOUNTED HOME");
        let {products} = this.props;
        if(Object.keys(products).length == 0 ) {
            let {dispatch, actions} = this.props;
            actions.fetchProductsList();
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppHeader/>
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