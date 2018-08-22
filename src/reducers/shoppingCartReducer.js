import { ADD_TO_CART, RELOAD } from '../configs/constants';
import CartModel from '../models/cart';

const initialState = {
	data: [],
	dataFetched: false,
	isFetching: false,
	error: false
};

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_TO_CART.DOING:
			return {
				...state,
				data: [],
				isFetching: true
			};
		case ADD_TO_CART.SUCCESS:
			let oldCart = JSON.parse(localStorage.getItem('cart'));
			let cart = new CartModel(oldCart ? oldCart : {});
			if (action.data) {
				cart.add(action.data, action.data.id);
				localStorage.setItem('cart', JSON.stringify(cart));
			}

			return {
				...state,
				isFetching: false,
				data: action.data
			};
		case ADD_TO_CART.FAILURE:
			return {
				...state,
				isFetching: false,
				error: true
			};
		case RELOAD:
			return {
				...state
			};
		default:
			return state;
	}
}
