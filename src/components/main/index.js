import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProduct } from '../../actions/productAction';
import ProductItem from './product-item';

class Main extends Component {
    componentWillMount() {
        console.log(this.props.location.search);

        this.props.getProduct(this.props.location.search);
    }

    render() {
        let productData = this.props.productData;
        return (
            <div className="App">
                <div className="container-fluid">
                    <div className="row">
                        {
                            productData.data.length &&
                            productData.data.map((product, i) => {
                                return (
                                    <ProductItem key={i} data={product} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productData: state.productReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProduct: (queryString) => dispatch(getProduct(queryString))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
