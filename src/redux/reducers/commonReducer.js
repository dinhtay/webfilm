import { START_LOADING, STOP_LOADING } from "../types/types";

const initialState = {
  isLoading: false,
};

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING: {
      state.isLoading = true;
      return { ...state };
    }
    case STOP_LOADING: {
      state.isLoading = false;
      return { ...state };
    }
    default:
      return state;
  }
};

export default CommonReducer;
