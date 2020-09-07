/* eslint-disable prettier/prettier */
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import newsReducer from './newsReducer';

const rootReducer = combineReducers({
  authReducer,
  newsReducer
});

export default rootReducer;
