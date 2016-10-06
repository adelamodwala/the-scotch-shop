import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import SnailLoader from '../common/SnailLoader';
import * as productsActions from '../../reducers/products/productsActions';

class Home extends Component {

    componentDidMount() {
        console.log("MOUNTED HOME");
        let {dispatch, actions} = this.props;
        dispatch(actions.fetchProductsList());
    }


    render() {
        let homeClass = classNames({
            'home-container': true
        });

        return (
            <div>
                <div className={homeClass}>
                    <div style={{position: 'absolute', left: 'calc(50% - 15px)', paddingTop: 30}}>
                        <SnailLoader />
                    </div>
                </div>

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


export default connect(mapStateToProps, mapDispatchToProps)(Home);