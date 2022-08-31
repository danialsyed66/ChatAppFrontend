import {
  CREATE_OR_GET_CONVERSATION_REQUEST,
  CREATE_OR_GET_CONVERSATION_SUCCESS,
  CREATE_OR_GET_CONVERSATION_FAIL,
  GET_CONVERSATIONS_REQUEST,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  RECIEVE_MESSAGE_SUCCESS,
  CLEAR_ERRORS,
  ActionTypes,
} from '../consts';

const reducer = (state: any = {}, { type, payload }: ActionTypes) => {
  switch (type) {
    case CREATE_OR_GET_CONVERSATION_REQUEST:
    case GET_CONVERSATIONS_REQUEST:
      return { ...state, loading: true };

    case GET_MESSAGES_REQUEST:
      return { ...state, messageLoading: true };

    case SEND_MESSAGE_REQUEST:
      return { ...state };

    case CREATE_OR_GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        conversation: payload,
      };

    case GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        conversations: payload.conversations,
        friends: payload.friends,
      };

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messageLoading: false,
        messages: payload,
      };

    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messageLoading: false,
        messages: [...state.messages, payload],
      };

    case RECIEVE_MESSAGE_SUCCESS:
      return {
        ...state,
        messageLoading: false,
        messages: [...state.messages, payload],
      };

    case CREATE_OR_GET_CONVERSATION_FAIL:
    case GET_CONVERSATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case GET_MESSAGES_FAIL:
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        messageLoading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default reducer;
