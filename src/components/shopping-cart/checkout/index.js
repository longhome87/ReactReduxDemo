import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reload } from '../../../actions/shoppingCartAction';

class Checkout extends Component {
    componentWillMount() {
        localStorage.setItem('cart', null);
        this.props.reload();
    }

    render() {
        return (
            <div className="text-center">
                <h1 className="text-success"><i className="far fa-check-circle"></i></h1>
                <h2>Thank you for your purchase!</h2>
                <a className="btn btn-success"
                    href="/">Continue Shopping</a>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reload: () => dispatch(reload())
    };
}

export default connect(null, mapDispatchToProps)(Checkout);
