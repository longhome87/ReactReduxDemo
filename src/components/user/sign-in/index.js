import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AlertError from '../../alert-error';
import { signIn } from '../../../actions/userAction';
import HELPER from '../../../configs/helper';
import { LOCAL_STORAGE } from '../../../configs/constants';


class SignIn extends Component {
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
			this.props.signIn(this.state.email, this.state.password);
		}
	}

	handleChange = (fieldName, e) => {
		this.setState({ [fieldName]: e.target.value });
	}

	render() {
		if (this.props.userData.redirectToRoot) {
			let oldURL = localStorage.getItem(LOCAL_STORAGE.OLD_URL) || '/';
			localStorage.removeItem(LOCAL_STORAGE.OLD_URL);
			return (
				<Redirect to={oldURL} />
			);
		}

		return (
			<div className="row">
				<div className="col-md-4 offset-md-4">
					<h1>Sign In</h1>
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
						<button className="btn btn-success" type="submit">Sign In</button>
					</form>
					<p>Don't have an account?
						<span> </span>
						<a href="/users/sign-up">Sign up instead!</a>
					</p>
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
		signIn: (email, password) => dispatch(signIn(email, password))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
