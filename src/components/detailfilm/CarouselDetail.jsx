import React, { Component } from "react";
import SimpleTabs from "./BookingMovieDetail";

class CarouselDetail extends Component {
  renderRating = (data) => {
    var star = [];
    for (let i = 1; i <= data; i++) {
      star += `<i class="fa fa-star"></i>`;
    }
    return star;
  };
  render() {
    const { movieDetail } = this.props;
    let dateFormat = require("dateformat");
    return (
      <section className="mycarousel">
        <div
          className="mycarousel__brand"
          style={{ backgroundImage: `url(${movieDetail.hinhAnh})` }}
        >
          {/* <div style={{ backgroundImage: `url(${movieDetail.hinhAnh})` }}></div> */}
          {/* <img src={movieDetail.hinhAnh} alt="background" /> */}
        </div>
        <div className="mycarousel__mobile">
          <img src={movieDetail.hinhAnh} alt="background" />
          <p className="mycarousel__content--name">{movieDetail.tenPhim}</p>
          <p>{dateFormat(movieDetail.ngayKhoiChieu, "dd-mm-yyyy")}</p>
        </div>
        <div className="mycarousel__content">
          <div className="mycarousel__content__image">
            <img src={movieDetail.hinhAnh} alt="movie" />
          </div>

          <div className="mycarousel__content__title">
            <p>{dateFormat(movieDetail.ngayKhoiChieu, "dd-mm-yyyy")}</p>
            <label htmlFor>C16</label>
            <p className="mycarousel__content--name">{movieDetail.tenPhim}</p>
            <p>{movieDetail.lichChieu.thoiLuong}</p>
          </div>
          <div className="mycarousel__content__evaluate">
            <p>{movieDetail.danhGia}</p>
            <p className="mycarousel__evaluate--rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </p>

            {/* <p>270 người đánh giá</p> */}
          </div>
        </div>
      </section>
    );
  }
}

export default CarouselDetail;
