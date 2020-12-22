import {
  FETCH_USER,
  SEARCH_USER,
  DELETE_USER,
  UPDATE_NOTIFY,
  GIVE_INFO_USER,
  SEARCH_FILM,
} from "../types/types";

const initialState = {
  listUser: [],
  searchUser: [],
  searchFilm: [],
  notify: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER: {
      state.listUser = action.payload;
      return { ...state };
    }

    case SEARCH_USER: {
      state.searchUser = action.payload;
      return { ...state };
    }
    case SEARCH_FILM: {
      state.searchFilm = action.payload;
      return { ...state };
    }
    case DELETE_USER: {
      state.notify = action.payload;
      return { ...state };
    }
    case UPDATE_NOTIFY: {
      state.notify = "";
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default adminReducer;
