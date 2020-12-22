import React, { PureComponent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import SwiperCore, { Navigation, Pagination, Autoplay, A11y } from "swiper";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import SearchCombobox from "./SearchCombobox";
import TransitionsModal from "./Modal";
import { connect } from "react-redux";
import { fetchBannerFilm } from "../../redux/actions/film.action";

SwiperCore.use([Navigation, Pagination, Autoplay, A11y]);
class Carousel extends PureComponent {
  renderCarousel = () => {
    const { bannerMovie } = this.props;
    return bannerMovie.map((movie, index) => {
      return (
        <SwiperSlide key={index}>
          <div className="swiper-slide">
            <img src={movie.hinhAnh} alt="" />
            <TransitionsModal movie={movie} />
          </div>
        </SwiperSlide>
      );
    });
  };
  render() {
    return (
      <section className="carousel__section" id="carousel">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              autoplay={{
                delay: 3000,
                // disableOnInteraction: false,
              }}
              // pagination={{ clickable: true }}
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log("slide change")}
            >
              {this.renderCarousel()}
            </Swiper>
          </div>
        </div>
        <SearchCombobox />
      </section>
    );
  }
  componentDidMount() {
    this.props.dispatch(fetchBannerFilm());
  }
}
const mapStateToProps = (state) => {
  return {
    bannerMovie: state.filmReducer.bannerMovie,
  };
};
export default connect(mapStateToProps)(Carousel);
