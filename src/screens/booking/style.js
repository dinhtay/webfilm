import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      width: "70%",
    },
  },

  root1: {
    flexGrow: 1,
    backgroundColor: "white",
  },

  root2: {
    marginTop: "20px",
  },
  chuaDat: {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red",
    },
  },
  chuaDatGheThuong: {
    backgroundColor: "#4a90e2",
    "&:hover": {
      backgroundColor: "aqua",
    },
  },
  chuaDatGheVip: {
    backgroundColor: "yellow",
    "&:hover": {
      backgroundColor: "aqua",
    },
  },

  daDat: {
    backgroundColor: "#afafaf",
    "&:hover": {
      cursor: "no-drop",
    },
  },

  dangChon: {
    backgroundColor: "#fb4226",
    "&:hover": {
      backgroundColor: "aqua",
    },
  },
}));

export default useStyles;
