import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import bankReducer from './bank/bank.reducer';

export default combineReducers({
    user: userReducer,
    bank: bankReducer
});