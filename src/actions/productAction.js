import {
	GET_PRODUCT,
	GET_PRODUCT_BY_ID,
	ADD_NEW_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	RELOAD,
	PRODUCT_DIALOG
} from '../configs/constants';
import {
	getProductAPI,
	getProductByIdAPI,
	addNewProductAPI,
	updateProductAPI,
	deleteProductAPI
} from '../api/productAPI';

export function getData() {
	return {
		type: GET_PRODUCT.DOING
	};
}

export function getDataSuccess(res) {
	return {
		type: GET_PRODUCT.SUCCESS,
		data: res.data
	};
}

export function getDataFailure(err) {
	return {
		type: GET_PRODUCT.FAILURE,
		err
	};
}

export function getProduct(queryString) {
	return (dispatch) => {
		dispatch(getData());
		getProductAPI(queryString)
			.then(data => {
				dispatch(getDataSuccess(data));
			})
			.catch(err => {
				dispatch(getDataFailure(err))
			});
	};
}

export function getProductByIdDoing() {
	return {
		type: GET_PRODUCT_BY_ID.DOING
	};
}

export function getProductByIdSuccess(res) {
	return {
		type: GET_PRODUCT_BY_ID.SUCCESS,
		data: res.data
	};
}

export function getProductByIdFailure(err) {
	return {
		type: GET_PRODUCT_BY_ID.FAILURE,
		err
	};
}

export function getProductById(id) {
	return (dispatch) => {
		dispatch(getProductByIdDoing());
		getProductByIdAPI(id)
			.then(res => {
				dispatch(getProductByIdSuccess(res));
			})
			.catch(err => {
				dispatch(getProductByIdFailure(err))
			});
	};
}

export function addNewProductDoing() {
	return {
		type: ADD_NEW_PRODUCT.DOING
	};
}

export function addNewProductSuccess(res) {
	return {
		type: ADD_NEW_PRODUCT.SUCCESS,
		data: res.data
	};
}

export function addNewProductFailure(err) {
	return {
		type: ADD_NEW_PRODUCT.FAILURE,
		err
	};
}

export function addNewProduct(data) {
	return (dispatch) => {
		dispatch(addNewProductDoing());
		addNewProductAPI(data)
			.then(res => {
				dispatch(addNewProductSuccess(res));
			})
			.catch(err => {
				dispatch(addNewProductFailure(err))
			});
	};
}

export function updateProductDoing() {
	return {
		type: UPDATE_PRODUCT.DOING
	};
}

export function updateProductSuccess(res) {
	return {
		type: UPDATE_PRODUCT.SUCCESS,
		data: res.data
	};
}

export function updateProductFailure(err) {
	return {
		type: UPDATE_PRODUCT.FAILURE,
		err
	};
}

export function updateProduct(data) {
	return (dispatch) => {
		dispatch(updateProductDoing());
		updateProductAPI(data)
			.then(res => {
				dispatch(updateProductSuccess(res));
			})
			.catch(err => {
				dispatch(updateProductFailure(err))
			});
	};
}

export function deleteProductDoing() {
	return {
		type: DELETE_PRODUCT.DOING
	};
}

export function deleteProductSuccess(res) {
	return {
		type: DELETE_PRODUCT.SUCCESS,
		data: res.data
	};
}

export function deleteProductFailure(err) {
	return {
		type: DELETE_PRODUCT.FAILURE,
		err
	};
}

export function deleteProduct(id) {
	return (dispatch) => {
		dispatch(deleteProductDoing());
		deleteProductAPI(id)
			.then(data => {
				dispatch(deleteProductSuccess(data));
				dispatch(getProduct());
			})
			.catch(err => {
				dispatch(deleteProductFailure(err))
			});
	};
}

export function reload() {
	return (dispatch) => {
		dispatch({
			type: RELOAD
		})
	};
}

export function toggleAddNewProductDialog() {
	return (dispatch) => {
		dispatch({
			type: PRODUCT_DIALOG.SHOW_ADD_NEW_PRODUCT
		})
	};
}

export function toggleEditProductDialog(id) {
	return (dispatch) => {
		dispatch({
			type: PRODUCT_DIALOG.SHOW_EDIT_PRODUCT,
			data: id
		})
	};
}

export function toggleDeleteProductDialog(id) {
	return (dispatch) => {
		dispatch({
			type: PRODUCT_DIALOG.SHOW_DELETE_PRODUCT,
			data: id
		})
	};
}
