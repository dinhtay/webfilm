import { FETCH_NEWS, FETCH_NEWS_DETAIL } from "../types/types";

let initialState = {
  news: [],
  newDetail: null,
};

const NewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS: {
      state.news = action.payload;
      return { ...state };
    }
    case FETCH_NEWS_DETAIL: {
      state.newDetail = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default NewsReducer;
