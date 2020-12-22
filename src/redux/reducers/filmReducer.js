import {
  FETCH_BANNER_FILM,
  FETCH_FILM,
  FETCH_FILM_DETAIL,
  FETCH_FILM_FOLLOW_DAY,
  FETCH_FILM_FOLLOW_PAGE,
  FETCH_FILM_SHOWTIME,
} from "../types/types";

let initialState = {
  movieList: [], //Danh sách phim
  movieNew: [], //Danh sách phim sắp chiếu
  movieListPage: [], //Danh sách phim phân trang
  movieDetail: null, //Chi tiết phim
  bannerMovie: [], //Danh sách bannner carousel
  movieShowTime: [], //Phim show time
};

const FilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILM: {
      state.movieList = action.payload;
      return { ...state };
    }
    case FETCH_FILM_FOLLOW_DAY: {
      state.movieNew = action.payload;
      return { ...state };
    }
    case FETCH_FILM_DETAIL: {
      state.movieDetail = action.payload;
      return { ...state };
    }
    case FETCH_BANNER_FILM: {
      state.bannerMovie = action.payload;
      return { ...state };
    }
    case FETCH_FILM_SHOWTIME: {
      state.movieShowTime = action.payload;
      return { ...state };
    }
    case FETCH_FILM_FOLLOW_PAGE: {
      state.movieListPage = action.payload;
      return { ...state };
    }
    default:
      return state;
  }
};

export default FilmReducer;
