import React, { Component } from 'react';
import { connect } from 'react-redux';

import AlertError from '../../alert-error';
import { signUp } from '../../../actions/userAction';
import { Redirect } from 'react-router-dom';
import HELPER from '../../../configs/helper';
import { LOCAL_STORAGE } from '../../../configs/constants';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let errors = HELPER.validEmailAndPassword(this.state.email, this.state.password);
        if (errors.length > 0) {
            this.setState({ errors: errors });
        } else {
            this.props.signUp(this.state.email, this.state.password);
        }
    }

    handleChange = (fieldName, e) => {
        this.setState({ [fieldName]: e.target.value });
    }

    render() {
        if (this.props.userData.redirectToRoot) {
            let oldURL = localStorage.getItem(LOCAL_STORAGE.OLD_URL) || '/';
            localStorage.removeItem(LOCAL_STORAGE.OLD_URL)
            return (
                <Redirect to={oldURL} />
            );
        }

        return (
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h1>Sign Up</h1>
                    <AlertError data={this.state.errors.concat(this.props.userData.errors)} />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="txtEmail">Email</label>
                            <input className="form-control"
                                name="txtEmail"
                                type="text"
                                placeholder="Email"
                                onChange={(e) => this.handleChange('email', e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="txtPassword">Password</label>
                            <input className="form-control"
                                name="txtPassword"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => this.handleChange('password', e)} />
                        </div>
                        <button className="btn btn-success" type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userData: state.userReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signUp: (email, password) => dispatch(signUp(email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);