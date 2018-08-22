import {
	GET_PRODUCT,
	GET_PRODUCT_BY_ID,
	ADD_NEW_PRODUCT,
	UPDATE_PRODUCT,
	DELETE_PRODUCT,
	RELOAD,
	PRODUCT_DIALOG
} from '../configs/constants';

const initialState = {
	data: [],
	dataFetched: false,
	isFetching: false,
	error: false,
	hasRedirect: false,
	selectedProduct: {},
	isAddNewProductShowed: false,
	isEditProductShowed: false,
	isDeleteProductShowed: false,
	currentProductId: 0
};

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCT.DOING:
			return {
				...state,
				data: [],
				isFetching: true,
				selectedProduct: {},
				isEditProductShowed: false
			};
		case GET_PRODUCT.SUCCESS:
			return {
				...state,
				isFetching: false,
				data: action.data
			};
		case GET_PRODUCT.FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		case GET_PRODUCT_BY_ID.DOING:
			return {
				...state,
				selectedProduct: {},
				isFetching: true
			};
		case GET_PRODUCT_BY_ID.SUCCESS:
			return {
				...state,
				isFetching: false,
				selectedProduct: action.data
			};
		case GET_PRODUCT_BY_ID.FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		case ADD_NEW_PRODUCT.DOING:
			return {
				...state,
				isFetching: true
			};
		case ADD_NEW_PRODUCT.SUCCESS:
			return {
				...state,
				isFetching: false,
				hasRedirect: true
			};
		case ADD_NEW_PRODUCT.FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		case UPDATE_PRODUCT.DOING:
			return {
				...state,
				isFetching: true
			};
		case UPDATE_PRODUCT.SUCCESS:
			return {
				...state,
				isFetching: false,
				hasRedirect: true
			};
		case UPDATE_PRODUCT.FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		case DELETE_PRODUCT.DOING:
			return {
				...state,
				isFetching: true
			};
		case DELETE_PRODUCT.SUCCESS:
			return {
				...state,
				isFetching: false
			};
		case DELETE_PRODUCT.FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		case PRODUCT_DIALOG.SHOW_ADD_NEW_PRODUCT:
			return {
				...state,
				isAddNewProductShowed: !state.isAddNewProductShowed,
				hasRedirect: false
			};
		case PRODUCT_DIALOG.SHOW_EDIT_PRODUCT:
			return {
				...state,
				isEditProductShowed: !state.isEditProductShowed,
				currentProductId: action.data,
				hasRedirect: false
			};
		case PRODUCT_DIALOG.SHOW_DELETE_PRODUCT:
			return {
				...state,
				isDeleteProductShowed: !state.isDeleteProductShowed,
				currentProductId: action.data,
			};
		case RELOAD:
			return {
				...state
			};
		default:
			return state;
	}
}
