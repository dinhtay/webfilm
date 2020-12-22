import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Container } from "@material-ui/core";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { fetchFilm, fetchFilmFollowDay } from "../../redux/actions/film.action";
import FilmItem from "./FilmItem";
import FilmNew from "./FilmNew";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#fff",
    marginTop: "100px",
    boxShadow: "none",
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    },
  },
  appBar: {
    boxShadow: "0",
    boxShadow: "none",
    outline: "none",
  },
  tabs: {
    color: "#fb4226",
    fontSize: "30px",
    fontWeight: "bold",
    margin: "auto",
    outline: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: "24px",
    },
  },
  tabbtn: {
    fontSize: "18px",
    outline: "none",
  },
}));

const options = {
  responsive: {
    0: {
      items: 2,
    },

    600: {
      items: 3,
    },

    1000: {
      items: 4,
    },
  },
};

export default function FilmViewList() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const dispatch = useDispatch();

  //Lấy danh sách phim từ Reducer
  const movieList = useSelector((state) => state.filmReducer.movieList);
  const movieNew = useSelector((state) => state.filmReducer.movieNew);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);

  //Call Api axios
  useEffect(() => {
    dispatch(fetchFilm());
    dispatch(fetchFilmFollowDay());
  }, []);

  //Phim đang chiếu
  const renderFilmNow = () => {
    return movieList.map((movie, index) => {
      return (
        <div key={index}>
          <FilmItem movie={movie} />
        </div>
      );
    });
  };

  //Phim sắp chiếu
  const renderFilmSoon = () => {
    return movieNew.map((movie, index) => {
      return (
        <div key={index}>
          <FilmNew movie={movie} />
        </div>
      );
    });
  };

  if (isLoading) {
    return (
      <div>
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <section className="container" id="lichchieu">
      <div className={classes.root}>
        <AppBar position="static" color="#fff" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            // indicatorColor="primary"
            // textColor="primary"
            //  variant="fullWidth"
            textAlign="center"
            aria-label="full width tabs example"
            className={classes.tabs}
          >
            <Tab
              className={classes.tabbtn}
              label="Đang chiếu"
              style={{ outline: "none" }}
              {...a11yProps(0)}
            />
            <Tab
              className={classes.tabbtn}
              style={{ outline: "none" }}
              label="Sắp chiếu"
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div class="film__section--list">
              <OwlCarousel
                className="owl-theme course__items"
                loop
                dots="false"
                items="4"
                margin={0}
                autoPlay
                nav
                {...options}
              >
                {renderFilmNow()}
              </OwlCarousel>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div class="film__section--list">
              <OwlCarousel
                className="owl-theme course__items"
                loop
                dots="false"
                items="4"
                margin={0}
                autoPlay
                nav
                {...options}
              >
                {renderFilmSoon()}
              </OwlCarousel>
            </div>
          </TabPanel>
        </SwipeableViews>
      </div>
    </section>
  );
}
