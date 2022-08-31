import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from './reducers';
import {
  login,
  register,
  loadUser,
  logout,
  clearErrors,
} from './actions/authActions';

import {
  getConversations,
  createOrGetConversation,
  getMessages,
  sendMessage,
  recieveMessage,
} from './actions/conversationActions';

const middlewares = [thunk];

const initialState = {};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

// export type State = ReturnType<typeof reducers>;
type State = { auth: any; chat: any };

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const authActions = bindActionCreators(
  { login, register, loadUser, logout, clearErrors },
  store.dispatch
);
export const conversationActions = bindActionCreators(
  {
    getConversations,
    createOrGetConversation,
    getMessages,
    sendMessage,
    recieveMessage,
    clearErrors,
  },
  store.dispatch
);

export default store;
