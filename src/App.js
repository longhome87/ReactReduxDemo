import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Header from './components/header';
import Main from './components/main';
import ShoppingCart from './components/shopping-cart';
import Checkout from './components/shopping-cart/checkout';
import SignIn from './components/user/sign-in';
import SignUp from './components/user/sign-up';
import Product from './components/product';
import ProductItem from './components/product/product-item';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Route exact path='/' component={(props) => <Main {...props} />} />
                    <Route path='/shopping-carts' exact component={ShoppingCart} />
                    <Route path='/shopping-carts/check-out' exact component={Checkout} />
                    <Route path='/users/sign-in' component={SignIn} />
                    <Route path='/users/sign-up' component={SignUp} />
                    <Route path='/products' exact component={Product} />
                    <Route path='/products/add' exact component={ProductItem} />
                    <Route path='/products/edit/:id' exact component={(props) => <ProductItem isEdit={true} {...props} />} />
                </div>
            </Router>
        );
    }
}

export default App;
