import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import {
  FETCH_LIST_STARTED,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  DELETE_LIST,
  ADD_LIST,
  EDIT_LIST
} from './actionTypes';

const initialState = {
  listItems: [],
  loading: false,
  error: null
}

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fetchListStarted = () => {
    dispatch({
      type: FETCH_LIST_STARTED
    });
  }
  
  const fetchListSuccess = (payload) => {
    dispatch({
      type: FETCH_LIST_SUCCESS,
      payload
    });
  }
  
  const fetchListFailure = (error) => {
    dispatch({
      type: FETCH_LIST_FAILURE,
      payload: { error }
    });
  }
  
  const deleteListItem = (id) => {
    dispatch({
      type: DELETE_LIST,
      payload: id
    });
  }
  
  const addListItem = (listItem) => {
    dispatch({
      type: ADD_LIST,
      payload: listItem
    });
  }

  const editListItem = (listItem) => {
    dispatch({
      type: EDIT_LIST,
      payload: listItem
    });
  }

  return (
    <GlobalContext.Provider value={{ 
      listItems: state.listItems,
      isFetching: state.loading,
      error: state.error,
      fetchListStarted,
      fetchListSuccess,
      fetchListFailure,
      deleteListItem,
      addListItem,
      editListItem
    }}>
      { children }
    </GlobalContext.Provider>
  )
}