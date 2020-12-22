import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCinemaInfoInSystem,
  fetchFilmFollowCinema,
} from "../../../redux/actions/cinema.action";

function Branch(props) {
  const { cinema } = props;

  const dispatch = useDispatch();

  return (
    <div className="cinema__section--logo active">
      <button
        onClick={() => {
          dispatch(fetchCinemaInfoInSystem(`${cinema.maHeThongRap}`));
          dispatch(fetchFilmFollowCinema(`${cinema.maHeThongRap}`));
        }}
      >
        <img src={cinema.logo} alt />
      </button>
    </div>
  );
}

export default Branch;
