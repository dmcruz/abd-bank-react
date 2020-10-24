import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import bankReducer from './bank/bank.reducer';
import critterReducer from './critters/critter.reducer';

export default combineReducers({
  user: userReducer,
  bank: bankReducer,
  critters: critterReducer,
});
