import { Dispatch } from 'redux';
import { IMessage } from '../../interfaces';
import axios from '../../utils/axios';

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

export const getConversations =
  () => async (dispatch: Dispatch<ActionTypes>) => {
    try {
      dispatch({
        type: GET_CONVERSATIONS_REQUEST,
        payload: undefined,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {
        data: { data },
      } = await axios.get('/api/v1/conversations', config);

      dispatch({
        type: GET_CONVERSATIONS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_CONVERSATIONS_FAIL,
        payload: error?.response?.data?.message || 'There was an error',
      });
    }
  };
export const createOrGetConversation =
  (friendId: string, create = false) =>
  async (dispatch: Dispatch<ActionTypes>) => {
    try {
      dispatch({
        type: CREATE_OR_GET_CONVERSATION_REQUEST,
        payload: undefined,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {
        data: { data },
      } = await axios.post('/api/v1/conversations', { friendId }, config);

      dispatch({
        type: CREATE_OR_GET_CONVERSATION_SUCCESS,
        payload: data.conversation,
      });
    } catch (error: any) {
      dispatch({
        type: CREATE_OR_GET_CONVERSATION_FAIL,
        payload: error?.response?.data?.message || 'There was an error',
      });
    }

    if (!create) return;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {
        data: { data },
      } = await axios.get('/api/v1/conversations', config);

      dispatch({
        type: GET_CONVERSATIONS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GET_CONVERSATIONS_FAIL,
        payload: error?.response?.data?.message || 'There was an error',
      });
    }
  };

export const getMessages =
  (conversationId: string) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
      dispatch({
        type: GET_MESSAGES_REQUEST,
        payload: undefined,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {
        data: { data },
      } = await axios.get(`/api/v1/messages/${conversationId}`, config);

      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: data.messages,
      });
    } catch (error: any) {
      dispatch({
        type: GET_MESSAGES_FAIL,
        payload: error?.response?.data?.message || 'There was an error',
      });
    }
  };

export const sendMessage =
  (messageData: IMessage) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
      dispatch({
        type: SEND_MESSAGE_REQUEST,
        payload: undefined,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {
        data: { data },
      } = await axios.post(`/api/v1/messages`, messageData, config);

      dispatch({
        type: SEND_MESSAGE_SUCCESS,
        payload: data.message,
      });
    } catch (error: any) {
      dispatch({
        type: SEND_MESSAGE_FAIL,
        payload: error?.response?.data?.message || 'There was an error',
      });
    }
  };

export const recieveMessage =
  (message: IMessage) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch({
      type: RECIEVE_MESSAGE_SUCCESS,
      payload: message,
    });
  };

export const clearErrors = () => ({ type: CLEAR_ERRORS });
