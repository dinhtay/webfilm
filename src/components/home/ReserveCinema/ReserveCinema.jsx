import React, { Component } from "react";
import Branch from "./Branch";
import CinemaReserve from "./CinemaReserve";
import FilmReserve from "./FilmReserve";
import { connect } from "react-redux";
import {
  fetchCinemaInfoInSystem,
  fetchCinemaSystem,
  selectedIdCinema,
  fetchFilmFollowCinema,
} from "../../../redux/actions/cinema.action";

class ReserveCinema extends Component {
  //Render Hệ thống Rạp
  renderBranch = () => {
    const { cinemaList } = this.props;
    return cinemaList.map((cinema, index) => {
      return (
        <div key={index}>
          <Branch cinema={cinema} />
        </div>
      );
    });
  };

  //Render cụm Rạp
  renderCinemaReserse = () => {
    const { cinemaInfo } = this.props;

    // if (cinemaInfo.length < 1) {
    //   return (
    //     <div className="cinema__rap--detail ">
    //       <div className="cimena__rap--titile">
    //         <p>
    //           <span style={{ fontSize: "14px" }}>
    //             Vui lòng chọn Hệ thống Rạp !!!
    //           </span>
    //         </p>
    //       </div>
    //     </div>

    //   );
    // }
    return cinemaInfo.map((cum, index) => {
      return (
        <div key={index}>
          <CinemaReserve cum={cum} />
        </div>
      );
    });
  };

  //Render Phim
  renderFilm = () => {
    const { movieFowllowCinema } = this.props;
    const { selectedCinema } = this.props;
    // if (!selectedCinema) {
    //   return (
    //     <div className="cinema__section--film">
    //       <p
    //         style={{
    //           color: "#fb4226",
    //           fontSize: "14px",
    //           fontWeight: " 600",
    //           marginLeft: "2%",
    //         }}
    //       >
    //         Vui lòng chọn Cụm Rạp !!!
    //       </p>
    //     </div>
    //   );
    // }

    let arrFilmNew = movieFowllowCinema.filter(
      (movie) => movie.maCumRap === selectedCinema
    );

    if (arrFilmNew.length < 1) {
      return (
        <div className="cinema__section--film">
          <p
            style={{
              color: "#fb4226",
              fontSize: "14px",
              fontWeight: " 600",
              marginLeft: "2%",
            }}
          >
            ...
          </p>
        </div>
      );
    }
    return arrFilmNew.map((movie, index) => {
      return (
        <div key={index}>
          <FilmReserve movie={movie} />
        </div>
      );
    });
  };

  render() {
    return (
      <section className="container" id="cumrap">
        <div className="cinema__section">
          {/* branch */}
          <div className="scroll scroll1">
            <div className="cinema__section--branch">{this.renderBranch()}</div>
          </div>
          {/* Cinema */}
          <div className="scroll scroll2">
            <div className="cinema__section--rap">
              {this.props.fetchFirst}
              {this.renderCinemaReserse()}
            </div>
          </div>
          {/* Film */}
          <div className="scroll scroll3">
            <div className="cinema__section--film">{this.renderFilm()}</div>
          </div>
        </div>
      </section>
    );
  }

  componentDidMount() {
    this.props.dispatch(fetchCinemaSystem());
    this.props.dispatch(
      fetchCinemaInfoInSystem(this.props.cinemaList.maHeThongRap)
    );
    //Fetch lần đầu
    this.props.dispatch(fetchCinemaInfoInSystem("BHDStar"));
    this.props.dispatch(selectedIdCinema("bhd-star-cineplex-3-2"));
    this.props.dispatch(fetchFilmFollowCinema("BHDStar"));
  }
}

const mapStateToProps = (state) => {
  return {
    //Danh sách hệ thống rạp
    cinemaList: state.cinemaReducer.cinemaList,

    //Danh sách cụm hệ thống rạp
    cinemaInfo: state.cinemaReducer.cinemaInfo,

    //Danh sách phim theo cụm rạp
    movieFowllowCinema: state.cinemaReducer.movieFowllowCinema,

    //Lấy id cụm rạp đã chọn
    selectedCinema: state.cinemaReducer.selectedCinema,
  };
};
export default connect(mapStateToProps)(ReserveCinema);
