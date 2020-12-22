import React, { Component } from "react";
import CarouselDetail from "../../components/detailfilm/CarouselDetail";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { connect } from "react-redux";
import {
  fetchFilmDetail,
  fetchFilmShowTime,
} from "../../redux/actions/film.action";
import SimpleTabs from "../../components/detailfilm/BookingMovieDetail";
import HeaderMobile from "../../components/layout/HeaderMobile";
import { fetchComment } from "../../redux/actions/comment.action";

class DetailMovieScreen extends Component {
  render() {
    const { movieDetail } = this.props;
    const { isLoading } = this.props;
    const { movieShowTime } = this.props;
    if (isLoading) {
      return (
        <div>
          <Header />
          <div className="loader">Loading...</div>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <HeaderMobile />
        <CarouselDetail movieDetail={movieDetail} />
        {/* <TabMovie movieDetail={movieDetail} /> */}
        <SimpleTabs movieShowTime={movieShowTime} movieDetail={movieDetail} />
        <Footer />
      </div>
    );
  }
  componentDidMount() {
    this.props.dispatch(fetchFilmDetail(this.props.match.params.movieID));
    this.props.dispatch(fetchFilmShowTime(this.props.match.params.movieID));
    this.props.dispatch(fetchComment());
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.commonReducer.isLoading,
    movieShowTime: state.filmReducer.movieShowTime,
    movieDetail: state.filmReducer.movieDetail || {
      lichChieu: {
        thongTinRap: {
          maRap: "",
          tenRap: "",
          maCumRap: "",
          tenCumRap: "",
          maHeThongRap: "",
          tenHeThongRap: "",
        },
        maLichChieu: "",
        maRap: "",
        maPhim: "",
        tenPhim: "",
        ngayChieuGioChieu: "",
        giaVe: "",
        thoiLuong: "",
      },
    },
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: "",
    moTa: "",
    maNhom: "",
    ngayKhoiChieu: "",
    danhGia: "",
  };
};

export default connect(mapStateToProps)(DetailMovieScreen);
