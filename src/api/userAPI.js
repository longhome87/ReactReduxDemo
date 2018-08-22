import axios from 'axios';
const url = 'http://localhost:3000/api/users'
export const signUpAPI = (email, password) => {
	return axios.post(url + '/signup', {
		txtEmail: email,
		txtPassword: password
	}).then(res => {
		return res;
	}).catch(err => {
		throw err;
	});
}

export const signInAPI = (email, password) => {
	return axios.post(url + '/signin', {
		txtEmail: email,
		txtPassword: password
	}).then(res => {
		return res;
	}).catch(err => {
		throw err;
	});
}
