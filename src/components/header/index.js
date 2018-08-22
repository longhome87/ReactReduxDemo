import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LOCAL_STORAGE } from '../../configs/constants';
import { reload } from '../../actions/shoppingCartAction';

class Header extends Component {
    logout = () => {
        localStorage.removeItem(LOCAL_STORAGE.CURRENT_USER);
    }

    render() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let totalQty = cart && cart.totalQty;
        let currentUser = localStorage.getItem(LOCAL_STORAGE.CURRENT_USER);
        let hasLogin = currentUser !== null;

        return (
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand"
                    href="/">
                    <img className="d-inline-block align-top"
                        src="/photo64.png"
                        width="30"
                        height="30"
                        alt="" />
                    <span> MiniShop</span>
                </a>
                <ul className="navbar-nav"
                    id="navbarMini">
                    <li className="nav-item">
                        <a className="nav-link"
                            href="/shopping-carts">
                            <i className="fas fa-shopping-cart">&nbsp;</i>
                            <span className="badge badge-secondary"
                                id="shoppingCartBadgeMini">{totalQty}
                            </span>
                        </a>
                    </li>
                </ul>
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="true">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="navbar-collapse collapse"
                    id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">
                                <span>Home</span>
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/chat">Chat</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="/products">Products</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="" data-toggle="dropdown" role="button">Sort</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/?sort=price&amp;order=asc">Price ASC</a>
                                <a className="dropdown-item" href="/?sort=price&amp;order=desc">Price DESC</a>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link"
                                href="/shopping-carts">
                                <i className="fas fa-shopping-cart" />
                                <span> Shopping Cart </span>
                                <span className="badge badge-secondary"
                                    id="shoppingCartBadge">{totalQty}
                                </span>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle"
                                href=""
                                data-toggle="dropdown"
                                role="button">
                                <i className="fas fa-user" />
                                <span> </span>
                                <span id="userManagement"> {hasLogin ? currentUser : 'User Management'}</span>
                            </a>
                            {
                                hasLogin ?
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item"
                                            href="/users/profile">User Account</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item"
                                            href='' onClick={this.logout}>Logout</a>
                                    </div>
                                    :
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item"
                                            href="/users/sign-up">Sign Up</a>
                                        <a className="dropdown-item"
                                            href="/users/sign-in">Sign In</a>
                                    </div>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        shoppingCartData: state.shoppingCartReducer,
        userData: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        reload: () => dispatch(reload())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
