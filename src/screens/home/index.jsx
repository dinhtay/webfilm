import React, { Component } from "react";
import Advertise from "../../components/home/Advertise";
import Carousel from "../../components/home/Carousel";
import Line from "../../components/home/Line";

import News from "../../components/home/News/News";
import ReserveCinema from "../../components/home/ReserveCinema/ReserveCinema";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import HeaderMobile from "../../components/layout/HeaderMobile";
import FilmViewList from "../../components/listfilm/FilmViewList";

class HomeScreen extends Component {
  render() {
    return (
      <div>
        <Header />
        <HeaderMobile />
        <Carousel />
        <FilmViewList />
        <Line />
        <ReserveCinema />
        <Line />
        <News />
        <Advertise />
        <Footer />
      </div>
    );
  }
}

export default HomeScreen;
