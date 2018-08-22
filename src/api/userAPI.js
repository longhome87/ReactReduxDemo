import axios from 'axios';
import { API_ROOT } from './api-config';

const baseURL = { API_ROOT } + 'users';
export const signUpAPI = (email, password) => {
	let url = baseURL + '/signup';
	return axios.post(url, {
		txtEmail: email,
		txtPassword: password
	}).then(res => {
		return res;
	}).catch(err => {
		throw err;
	});
}

export const signInAPI = (email, password) => {
	let url = baseURL + '/signin';
	return axios.post(url, {
		txtEmail: email,
		txtPassword: password
	}).then(res => {
		return res;
	}).catch(err => {
		throw err;
	});
}
