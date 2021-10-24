import { UserReducer } from './userReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
const { combineReducers } = require('redux');

const rootReducer = combineReducers({
  user: UserReducer,
  toastr: toastrReducer,
});

export default rootReducer;
