import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as productsActions from '../../reducers/products/productsActions';
import SnailLoader from '../common/SnailLoader';
import ProductTile from './ProductTile';

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
        let products = this.props.products;

        return (
            <div>
                <div className={homeClass}>
                    {products.length > 0 ?
                        <div style={{
                            padding: 10,
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "row",
                            flexFlow: "wrap"
                        }}>
                            {products.map((product, idx) => {
                                return (
                                    <ProductTile key={idx} product={product}/>
                                );
                            })}
                        </div> :
                        <div style={{position: 'absolute', left: 'calc(50% - 15px)', paddingTop: 30}}>
                            <SnailLoader />
                        </div>
                    }

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