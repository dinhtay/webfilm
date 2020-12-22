import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Showtimes from "./Showtimes";
import Information from "./Information";
import Review from "./Review";
import { useParams } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "#fb4226",
    backgroundColor: theme.palette.background.paper,
    background: "#0a2029",
  },
}));

export default function SimpleTabs(props) {
  const { movieID } = useParams();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { movieDetail } = props;
  const { movieShowTime } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section className="introduce">
      <div className="container">
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              style={{ background: "#0a2029" }}
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab
                className="link__notification"
                label="Lịch chiếu"
                {...a11yProps(0)}
              />
              <Tab
                className="link__notification"
                label="Thông tin"
                {...a11yProps(1)}
              />
              <Tab
                className="link__evaluate"
                label="Đánh giá"
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Showtimes movieShowTime={movieShowTime} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Information movieDetail={movieDetail} />
          </TabPanel>
          <TabPanel
            className="comment"
            style={{ overflow: "scroll", height: "584px" }}
            value={value}
            index={2}
          >
            <Review maPhim={movieID} movieDetail={movieDetail} />
          </TabPanel>
        </div>
      </div>
    </section>
  );
}
