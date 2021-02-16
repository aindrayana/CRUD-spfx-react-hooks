import {
  FETCH_LIST_STARTED,
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILURE,
  DELETE_LIST,
  ADD_LIST,
  EDIT_LIST
} from './actionTypes';

export default (state, action) => {
  switch(action.type) {
    case FETCH_LIST_STARTED: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        listItems: action.payload,
      };
    }
    case FETCH_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case DELETE_LIST: {
      let id = action.payload ? Number(action.payload) : action.payload;
      return {
        ...state,
        listItems: state.listItems.filter(item => item.Id !== id)
      }
    }
    case ADD_LIST: {
      return {
        ...state,
        listItems: [...state.listItems, action.payload]
      }
    }
    case EDIT_LIST: {
      return {
        ...state,
        // listItems: [action.payload, ...state.listItems]
        listItems: state.listItems.map(item => {
          if (item.Id !== action.payload.Id) {
            return item
          }
          return action.payload
        })
      }
    }
    default:
      return state;
  }
}
