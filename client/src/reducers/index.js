import { combineReducers } from 'redux';
import changeHandler from './changeHandler';
import verification from './verification';
import postRedux from './postRedux';

const allReducers = combineReducers({
	changeHandler,
	verification,
	postRedux,
});

export default allReducers;
