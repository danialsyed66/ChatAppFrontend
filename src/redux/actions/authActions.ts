import { Dispatch } from 'redux';
import { IAuthLogin, IAuthRegister } from '../../interfaces';
import axios from '../../utils/axios';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  ActionTypes,
} from '../consts';

export const login =
  (userData: IAuthLogin) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
        payload: undefined,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const {
        data: { data, token },
      } = await axios.post('/api/v1/login', userData, config);

      localStorage.setItem('token', token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.user,
      });
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error?.response?.data?.message || 'There was an error',
      });
    }
  };

export const register =
  (userData: IAuthRegister) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
        payload: undefined,
      });

      console.log(userData, 11111);

      const config = { headers: { 'Content-Type': 'application/json' } };

      const {
        data: { data, token },
      } = await axios.post('/api/v1/register', userData, config);

      localStorage.setItem('token', token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.user,
      });
    } catch (error: any) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error?.response?.data?.message || 'There was an error',
      });
    }
  };

export const loadUser = () => async (dispatch: Dispatch<ActionTypes>) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
      payload: undefined,
    });

    const {
      data: { data },
    } = await axios.get('/api/v1/profile');

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error: any) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error?.response?.data?.message || 'There was an error',
    });
  }
};

export const logout = () => (dispatch: Dispatch<ActionTypes>) => {
  try {
    // await axios.post('/api/v1/logout');
    localStorage.removeItem('token');

    dispatch({
      type: LOGOUT_SUCCESS,
      payload: undefined,
    });
  } catch (error: any) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error?.response?.data?.message || 'There was an error',
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
