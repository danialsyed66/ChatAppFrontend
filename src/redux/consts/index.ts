import { IConversation, IMessage, IUser } from '../../interfaces';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'LOAD_USER_FAIL';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export const GET_CONVERSATIONS_REQUEST = 'GET_CONVERSATIONS_REQUEST';
export const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS';
export const GET_CONVERSATIONS_FAIL = 'GET_CONVERSATIONS_FAIL';

export const CREATE_OR_GET_CONVERSATION_REQUEST =
  'CREATE_OR_GET_CONVERSATION_REQUEST';
export const CREATE_OR_GET_CONVERSATION_SUCCESS =
  'CREATE_OR_GET_CONVERSATION_SUCCESS';
export const CREATE_OR_GET_CONVERSATION_FAIL =
  'CREATE_OR_GET_CONVERSATION_FAIL';

export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAIL = 'GET_MESSAGES_FAIL';

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL';

export const RECIEVE_MESSAGE_SUCCESS = 'RECIEVE_MESSAGE_SUCCESS';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export type ActionTypes =
  | {
      type:
        | typeof LOGIN_REQUEST
        | typeof REGISTER_REQUEST
        | typeof LOAD_USER_REQUEST
        | typeof LOGOUT_SUCCESS
        | typeof GET_CONVERSATIONS_REQUEST
        | typeof CREATE_OR_GET_CONVERSATION_REQUEST
        | typeof GET_MESSAGES_REQUEST
        | typeof SEND_MESSAGE_REQUEST
        | typeof CLEAR_ERRORS;
      payload: undefined;
    }
  | {
      type:
        | typeof LOGIN_SUCCESS
        | typeof REGISTER_SUCCESS
        | typeof LOAD_USER_SUCCESS;
      payload: IUser;
    }
  | {
      type: typeof CREATE_OR_GET_CONVERSATION_SUCCESS;
      payload: IConversation;
    }
  | {
      type: typeof GET_CONVERSATIONS_SUCCESS;
      payload: { conversations: IConversation; friends: IUser };
    }
  | {
      type:
        | typeof GET_MESSAGES_SUCCESS
        | typeof SEND_MESSAGE_SUCCESS
        | typeof RECIEVE_MESSAGE_SUCCESS;
      payload: IMessage;
    }
  | {
      type:
        | typeof LOGIN_FAIL
        | typeof REGISTER_FAIL
        | typeof LOAD_USER_FAIL
        | typeof LOGOUT_FAIL
        | typeof GET_CONVERSATIONS_FAIL
        | typeof CREATE_OR_GET_CONVERSATION_FAIL
        | typeof GET_MESSAGES_FAIL
        | typeof SEND_MESSAGE_FAIL;
      payload: string;
    };

// export const SERVER_URI = 'http://localhost:8000';
export const SERVER_URI =
  'https://chatapp-ts-backend.herokuapp.com/api/v1/conversations';
