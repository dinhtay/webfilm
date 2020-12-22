import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    width: "50%",
    boxShadow: theme.shadows[4],
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  trailer: {
    width: "100%",
    height: "500px",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
    },
  },
  btnXem: {
    border: "1px solid #3e515d",
    color: "#3e515d",
    [theme.breakpoints.down("sm")]: {
      padding: "2px",
    },
  },
}));

export default function ModalTrailer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.btnXem} type="button" onClick={handleOpen}>
        Xem
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <iframe
              className={classes.trailer}
              src={props.trailer}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
