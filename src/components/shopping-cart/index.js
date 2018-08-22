import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ShoppingCartItem from './shopping-cart-item';
import CartModel from '../../models/cart';
import { reload } from '../../actions/shoppingCartAction';
import { LOCAL_STORAGE } from '../../configs/constants';

class ShoppingCart extends Component {
    constructor() {
        super();
        this.state = {
            redirectToSignIn: false,
            redirectToCheckout: false
        };
    }

    handleReduce = (cart, id) => {
        cart.reduceByOne(id);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.props.reload();
    }

    handleRemove = (cart, id) => {
        cart.removeItem(id);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.props.reload();
    }

    handleCheckout = () => {
        if (!localStorage.getItem(LOCAL_STORAGE.CURRENT_USER)) {
            this.setState({ redirectToSignIn: true });
        } else {
            this.setState({ redirectToCheckout: true });
        }
    }

    render() {
        if (this.state.redirectToSignIn) {
            localStorage.setItem(LOCAL_STORAGE.OLD_URL, '/shopping-carts');
            return (
                <Redirect to="/users/sign-in" />
            );
        }

        if (this.state.redirectToCheckout) {
            return (
                <Redirect to="/shopping-carts/check-out" />
            );
        }

        let cartJSON = JSON.parse(localStorage.getItem('cart')) || {};
        let cart = new CartModel(cartJSON);

        return (
            <div className="container">
                {
                    cart.totalQty === 0 ?
                        <div className="row">
                            <div className="col-sm-8 col-md-8 offset-sm-2 offset-md-2">
                                <h2>No Items in Cart</h2>
                            </div>
                        </div>
                        :
                        <Fragment>
                            <div className="row">
                                <div className="col-sm-8 col-md-8 offset-sm-2 offset-md-2">
                                    <ul className="list-group">
                                        {
                                            cart.generateArray().map((data, i) => {
                                                return (
                                                    <ShoppingCartItem key={i}
                                                        data={data}
                                                        onReduce={() => this.handleReduce(cart, data.item.id)}
                                                        onRemove={() => this.handleRemove(cart, data.item.id)} />
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-8 col-md-8 offset-sm-2 offset-md-2">
                                    <strong>Total: {cart.totalPrice}</strong>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-8 col-md-8 offset-sm-2 offset-md-2">
                                    <a className="btn btn-success"
                                        href="" onClick={this.handleCheckout}>Checkout</a>
                                </div>
                            </div>
                        </Fragment>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        shoppingCartData: state.shoppingCartReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        reload: () => dispatch(reload())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
