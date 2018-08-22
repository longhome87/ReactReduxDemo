import { combineReducers } from 'redux';
import productReducer from './productReducer';
import shoppingCartReducer from './shoppingCartReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	productReducer,
	shoppingCartReducer,
	userReducer
});

export default rootReducer;
