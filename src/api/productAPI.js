import axios from 'axios';
import { API_ROOT } from './api-config';

const baseURL = API_ROOT + 'products';
export const getProductAPI = (queryString) => {
	console.log(baseURL);

	let url = baseURL;
	if (queryString) {
		url += queryString;
	}

	return axios
		.get(url)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
};

export const getProductByIdAPI = (id) => {
	let url = baseURL + '/' + id;
	return axios
		.get(url)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
};

export const addNewProductAPI = (data) => {
	let fd = new FormData();
	fd.append('txtName', data.name);
	fd.append('txtCost', data.cost);
	fd.append('txtQty', data.quantity);
	fd.append('txtPrice', data.price);
	if (data.image) {
		fd.append('txtImage', data.image, data.image.name);
	}

	return axios
		.post(baseURL, fd)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
};

export const updateProductAPI = (data) => {
	let fd = new FormData();
	fd.append('txtName', data.name);
	fd.append('txtCost', data.cost);
	fd.append('txtQty', data.quantity);
	fd.append('txtPrice', data.price);

	let url = baseURL + '/' + data.id;
	return axios
		.put(url, fd)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
};

export const deleteProductAPI = (id) => {
	let url = baseURL + '/' + id;
	return axios
		.delete(url)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			throw err;
		});
};
