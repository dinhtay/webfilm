import { createAction } from ".";
import { newsService } from "../../services";
import { FETCH_NEWS, FETCH_NEWS_DETAIL } from "../types/types";
import { startLoading, stopLoading } from "./common.action";

export const fetchNews = () => {
  return (dispatch) => {
    dispatch(startLoading());
    newsService
      .fetchNews()
      .then((res) => {
        dispatch(createAction(FETCH_NEWS, res.data));

        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};

export const fetchNewDetail = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    newsService
      .fetchDetailNew(id)
      .then((res) => {
        dispatch(createAction(FETCH_NEWS_DETAIL, res.data));
        dispatch(stopLoading());
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
      });
  };
};
