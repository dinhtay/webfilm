// import logo from "./logo.svg";
import "./App.scss";
import HomeScreen from "./screens/home";
import DetailMovieScreen from "./screens/detail";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignIn from "./screens/signIn";
import SignUp from "./screens/signUp";

import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { createAction } from "./redux/actions";
import { SIGN_IN } from "./redux/types/types";
import Booking from "./screens/booking";
import NewDetail from "./screens/news";
import AdminScreen from "./screens/admin";
import UserScreen from "./screens/admin/user";
import ManagerFilmScreen from "./screens/admin/film";
import MangerCinemaScreen from "./screens/admin/cinema";
import { Router } from "@material-ui/icons";
import ShowtimeScreen from "./screens/admin/showtime";
import Profile from "./screens/profile";
import HeaderMobile from "./components/layout/HeaderMobile";
import Guard from "./HOC/guard/Guard";

function App() {
  const dispatch = useDispatch();
  function getCredentialssFromLocal() {
    const credentialsStr = localStorage.getItem("creadentials");
    if (credentialsStr) {
      dispatch(createAction(SIGN_IN, JSON.parse(credentialsStr)));
    }
  }
  useEffect(() => {
    getCredentialssFromLocal();
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/detail/:movieID" exact component={DetailMovieScreen} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/booking/:maLichChieu" exact component={Booking} />
        <Route path="/news/:newID" exact component={NewDetail} />
        <Route path="/profile" exact component={Profile} />
        {/* <Route path="/admin" exact component={AdminScreen} /> */}
        <Route path="/admin/manager-user" exact component={UserScreen} />
        <Router
          path="/admin/manager-film"
          exact
          component={ManagerFilmScreen}
        />
        <Router
          path="/admin/manager-cinema"
          exact
          component={MangerCinemaScreen}
        />
        <Router
          path="/admin/showtime/:maLichChieu"
          exact
          component={ShowtimeScreen}
        />
        <Guard>
          <Route path="/admin" exact component={AdminScreen} />
        </Guard>
        {/* <Guard>
          <Route path="/admin/manager-user" exact component={UserScreen} />
        </Guard>
        <Guard>
          <Router
            path="/admin/manager-film"
            exact
            component={ManagerFilmScreen}
          />
        </Guard>
        <Guard>
          <Router
            path="/admin/manager-cinema"
            exact
            component={MangerCinemaScreen}
          />
        </Guard>
        <Guard>
          <Router
            path="/admin/showtime/:maLichChieu"
            exact
            component={ShowtimeScreen}
          />
        </Guard> */}
      </Switch>
    </BrowserRouter>
  );
}

export default connect()(App);
