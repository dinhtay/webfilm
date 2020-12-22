import React from "react";
import { connect } from "react-redux";
import ShowtimeBranch from "./Showtime/ShowtimeBranch";
import ShowtimeDay from "./Showtime/ShowtimeDay";
import ShowtimeFilm from "./Showtime/ShowtimeFilm";

function Showtimes(props) {
  const { movieShowTime } = props;

  //return movieShowTime.map((movieShowTime, index) => {
  return (
    <div className="introduce__title1__content">
      <div id="showtimes" className="showtimes">
        <div className="showtimes__left">
          {/* Branch */}
          <ShowtimeBranch movieShowTime={movieShowTime} />
        </div>
        <div className="showtimes__right">
          <div
            className="scroll1"
            style={{ overflow: "hidden", overflowX: "scroll" }}
          >
            <div className="showtimes__right__date">
              {/* Date */}
              <ShowtimeDay movieShowTime={movieShowTime} />
            </div>
          </div>
          <div className="showtimes__right__content">
            <div className="scroll3">
              {/* Film */}
              <ShowtimeFilm movieShowTime={movieShowTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  //});
}

export default connect()(Showtimes);
