import { createAction } from "./index";
import { filmService } from "../../services";
import {
  FETCH_BANNER_FILM,
  FETCH_FILM,
  FETCH_FILM_DETAIL,
  FETCH_FILM_FOLLOW_DAY,
  FETCH_FILM_FOLLOW_PAGE,
  FETCH_FILM_SHOWTIME,
} from "../types/types";
import { startLoading, stopLoading } from "./common.action";

export const fetchFilm = () => {
  return (dispatch) => {
    dispatch(startLoading());
    filmService
      .fetchFilm()
      .then((res) => {
        dispatch(createAction(FETCH_FILM, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchFilmFollowDay = (id) => {
  return (dispatch) => {
    // dispatch(startLoading());
    filmService
      .fetchFilmFollowDay(id)
      .then((res) => {
        dispatch(createAction(FETCH_FILM_FOLLOW_DAY, res.data));
        // dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        //dispatch(stopLoading());
      });
  };
};

export const fetchFilmFollowPage = (page) => {
  return (dispatch) => {
    filmService
      .fetchFilmFollowPage(page)
      .then((res) => dispatch(createAction(FETCH_FILM_FOLLOW_PAGE, res.data)))
      .catch((err) => console.log(err));
  };
};

export const fetchFilmDetail = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    filmService
      .fetchFilmDetail(id)
      .then((res) => {
        dispatch(createAction(FETCH_FILM_DETAIL, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const fetchBannerFilm = () => {
  return (dispatch) => {
    filmService
      .fetchBannerFilm()
      .then((res) => {
        dispatch(createAction(FETCH_BANNER_FILM, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchFilmShowTime = (id) => {
  return (dispatch) => {
    filmService
      .fetchFilmShowTime(id)
      .then((res) => {
        dispatch(createAction(FETCH_FILM_SHOWTIME, res.data.heThongRapChieu));
      })
      .catch((err) => console.log(err));
  };
};
