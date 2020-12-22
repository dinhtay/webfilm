import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectedIdCinema } from "../../../redux/actions/cinema.action";
export default function ShowtimeBranch(props) {
  const { movieShowTime } = props;
  const dispatch = useDispatch();
  const fetchFirst = movieShowTime[0]?.maHeThongRap;
  useEffect(() => {
    dispatch(selectedIdCinema(fetchFirst));
  }, []);
  return movieShowTime.map((branch, index) => {
    return (
      <button
        onClick={() => dispatch(selectedIdCinema(`${branch.maHeThongRap}`))}
        className="showtimes__left__logo"
        key={index}
      >
        <div className="showtimes__left__logo--imges">
          <img src={branch.logo} alt />
        </div>
        {/* <div className="showtimes__left__logo--title">
          <h4>{branch.tenHeThongRap}</h4>
        </div> */}
      </button>
    );
  });
}
