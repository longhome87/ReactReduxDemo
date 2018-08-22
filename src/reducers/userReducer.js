import { SIGN_UP, LOCAL_STORAGE, SIGN_IN } from '../configs/constants';

const initialState = {
	data: [],
	dataFetched: false,
	isFetching: false,
	hasError: false,
	errors: [],
	redirectToRoot: false
};

export default function dataReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_UP.DOING:
			return {
				...state,
				data: [],
				isFetching: true
			};
		case SIGN_UP.SUCCESS:
			if (action.data.hasError) {
				return {
					...state,
					isFetching: false,
					hasError: action.data.hasError,
					errors: action.data.messages
				};
			}

			localStorage.setItem(LOCAL_STORAGE.CURRENT_USER, action.data.email);
			return {
				...state,
				isFetching: false,
				data: action.data,
				redirectToRoot: true
			};
		case SIGN_UP.FAILURE:
			return {
				...state,
				isFetching: false,
				hasError: true
			};
		case SIGN_IN.DOING:
			return {
				...state,
				data: [],
				isFetching: true
			};
		case SIGN_IN.SUCCESS:
			if (action.data.hasError) {
				return {
					...state,
					isFetching: false,
					hasError: action.data.hasError,
					errors: action.data.messages
				};
			}

			localStorage.setItem(LOCAL_STORAGE.CURRENT_USER, action.data.email);
			return {
				...state,
				isFetching: false,
				data: action.data,
				redirectToRoot: true
			};
		case SIGN_IN.FAILURE:
			return {
				...state,
				isFetching: false,
				hasError: true
			};
		default:
			return state;
	}
}
