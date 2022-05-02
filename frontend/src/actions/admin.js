import {
    CREATE_MOD,
    RETRIEVE_USERS,
    UPDATE_USER,
    DELETE_USER,
  } from "./types";
  
  import AdminDataService from "../services/AdminService";

  export const createMod = (username, nombre, apellido_p, apellido_m, email, password) => async (dispatch) => {
    try {
      const res = await AdminDataService.create({ username, nombre, apellido_p, apellido_m, email, password });
      dispatch({
        type: CREATE_MOD,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const retrieveUsers = () => async (dispatch) => {
    try {
      const res = await AdminDataService.getAll();
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const updateUser = (id, data) => async (dispatch) => {
    try {
      const res = await AdminDataService.update(id, data);
      dispatch({
        type: UPDATE_USER,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteUser = (id) => async (dispatch) => {
    try {
      await AdminDataService.remove(id);
      dispatch({
        type: DELETE_USER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const findUsersByApellido = (title) => async (dispatch) => {
    try {
      const res = await AdminDataService.findByApellido(title);
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  