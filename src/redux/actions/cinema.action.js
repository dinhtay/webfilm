import { createAction } from ".";
import { cinemaService } from "../../services";
import {
  FETCH_CINEMA_INFO_IN_SYSTEM,
  FETCH_CINEMA_SYSTEM,
  FETCH_FILM_FOLLOW_CINEMA,
  FETCH_FILM_SHOWTIME,
  SELECTED_DATE,
  SELECTED_ID_CINEMA,
} from "../types/types";
import { startLoading, stopLoading } from "./common.action";

export const fetchCinemaSystem = () => {
  return (dispatch) => {
    cinemaService
      .fetchCinemaSystem()
      .then((res) => {
        dispatch(createAction(FETCH_CINEMA_SYSTEM, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchCinemaInfoInSystem = (id) => {
  return (dispatch) => {
    cinemaService
      .fetchCinemaInfoInSystem(id)
      .then((res) => {
        dispatch(createAction(FETCH_CINEMA_INFO_IN_SYSTEM, res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchFilmFollowCinema = (id) => {
  return (dispatch) => {
    cinemaService
      .fetchFilmFollowCinema(id)
      .then((res) => {
        dispatch(createAction(FETCH_FILM_FOLLOW_CINEMA, res.data[0].lstCumRap));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const selectedIdCinema = (id) => {
  return (dispatch) => {
    dispatch(createAction(SELECTED_ID_CINEMA, id));
  };
};

export const selectedDate = (date) => {
  return (dispatch) => {
    dispatch(createAction(SELECTED_DATE, date));
  };
};

export const fetchFilmShowTime = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    cinemaService
      .fetchFilmShowTime(id)
      .then((res) => {
        dispatch(createAction(FETCH_FILM_SHOWTIME, res.data.heThongRapChieu));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
