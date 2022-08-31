import { combineReducers } from 'redux';

import authReducer from './authReducer';
import conversationReducer from './conversationReducer';

export default combineReducers({
  auth: authReducer,
  chat: conversationReducer,
});
