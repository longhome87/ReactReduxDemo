import { ADD_TO_CART, RELOAD } from '../configs/constants';
import { getProductByIdAPI } from '../api/productAPI';

export function getData() {
	return {
		type: ADD_TO_CART.DOING
	};
}

export function getDataSuccess(res) {
	return {
		type: ADD_TO_CART.SUCCESS,
		data: res.data
	};
}

export function getDataFailure(err) {
	return {
		type: ADD_TO_CART.FAILURE,
		err
	};
}

export function addToCart(id) {
	return (dispatch) => {
		dispatch(getData());
		getProductByIdAPI(id)
			.then(data => {
				dispatch(getDataSuccess(data));
			})
			.catch(err => {
				dispatch(getDataFailure(err));
			})
	}
}

export function reload() {
	return (dispatch) => {
		dispatch({
			type: RELOAD
		})
	};
}
