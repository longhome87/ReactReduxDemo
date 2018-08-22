import { SIGN_UP, SIGN_IN } from '../configs/constants';
import { signUpAPI, signInAPI } from '../api/userAPI';

export function signUpDoing() {
	return {
		type: SIGN_UP.DOING
	};
}

export function signUpSuccess(res) {
	return {
		type: SIGN_UP.SUCCESS,
		data: res.data
	};
}

export function signUpFailure(err) {
	return {
		type: SIGN_UP.FAILURE,
		err
	};
}

export function signUp(email, password) {
	return (dispatch) => {
		dispatch(signUpDoing());
		signUpAPI(email, password)
			.then(data => {
				dispatch(signUpSuccess(data));
			})
			.catch(err => {
				dispatch(signUpFailure(err));
			})
	}
}

export function signInDoing() {
	return {
		type: SIGN_IN.DOING
	};
}

export function signInSuccess(res) {
	return {
		type: SIGN_IN.SUCCESS,
		data: res.data
	};
}

export function signInFailure(err) {
	return {
		type: SIGN_IN.FAILURE,
		err
	};
}

export function signIn(email, password) {
	return (dispatch) => {
		dispatch(signInDoing());
		signInAPI(email, password)
			.then(data => {
				dispatch(signInSuccess(data));
			})
			.catch(err => {
				dispatch(signInFailure(err));
			})
	}
}
