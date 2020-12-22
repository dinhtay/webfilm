// import React, { PureComponent } from "react";
// import OwlCarousel from "react-owl-carousel";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import FilmItem from "./FilmItem";
// import { connect } from "react-redux";

// import { fetchFilm, fetchFilmFollowDay } from "../../redux/actions/film.action";
// import Header from "../layout/Header";

// const options = {
//   items: 4,
// };

// class ListFilm extends PureComponent {
//   renderMovieList = () => {
//     const { movieNew } = this.props;
//     const { movieList } = this.props;
//     // const movieRanDom = movieNew
//     //   .sort(() => Math.random() - Math.random())
//     //   .find(() => true);

//     if (movieList) {
//       console.log(movieList);
//       return movieList?.map((movie, index) => {
//         return (
//           <div key={index}>
//             <FilmItem movie={movie} />
//           </div>
//         );
//       });
//     } else if (movieNew) {
//       console.log(movieNew);
//       return movieNew?.map((movie, index) => {
//         return (
//           <div key={index}>
//             <FilmItem movie={movie} />
//           </div>
//         );
//       });
//     }
//   };

//   render() {
//     const { isLoading } = this.props;
//     if (isLoading) {
//       return (
//         <div>
//           <Header />
//           <div className="loader">Loading...</div>
//         </div>
//       );
//     }
//     return (
//       <section className="container" id="lichchieu">
//         <div className="film__section">
//           <div className="film__section--title">
//             <button
//               className="btn-dangchieu"
//               onClick={() => this.props.dispatch(fetchFilm())}
//               id="btnDangChieu"
//             >
//               Đang chiếu
//             </button>
//             <button
//               className="btn-sapchieu"
//               onClick={() => this.props.dispatch(fetchFilmFollowDay())}
//               id="btnSapChieu"
//             >
//               Sắp chiếu
//             </button>
//           </div>
//           <div class="film__section--list">
//             <OwlCarousel
//               className="owl-theme course__items"
//               loop
//               items="4"
//               margin={0}
//               nav
//               autoPlay
//             >
//               {this.renderMovieList()}
//             </OwlCarousel>
//           </div>
//         </div>
//       </section>
//     );
//   }
//   componentDidMount() {
//     //call api
//     this.props.dispatch(fetchFilm());
//     this.props.dispatch(fetchFilmFollowDay());
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     isLoading: state.commonReducer.isLoading,
//     movieList: state.filmReducer.movieList,
//     movieNew: state.filmReducer.movieNew,
//   };
// };

// export default connect(mapStateToProps)(ListFilm);
