import React from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import HeaderMobile from "../../components/layout/HeaderMobile";
import ProfileUser from "../../components/profileUser";

export default function Profile() {
  return (
    <>
      <Header></Header>
      <HeaderMobile />
      <ProfileUser></ProfileUser>
      <Footer></Footer>
    </>
  );
}
