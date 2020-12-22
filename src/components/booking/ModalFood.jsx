import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteFood,
  optionalQuantity,
} from "../../redux/actions/booking.actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fb4226",
    width: "50%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  trailer: {
    width: "100%",
    height: "600px",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
    },
  },
  table: {
    width: "100%",
  },
  thead: {
    fontWeight: "700",
  },
  btnRemove: {
    fontSize: "18px",
    color: "red",
  },
  btnClose: {
    fontSize: "18px",
    fontWeight: "700",
    color: "red",
  },
}));

export default function ModalFood() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const cartFoodList = useSelector(
    (state) => state.bookingReducer.cartFoodList
  );
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const ListCart = () => {
    return cartFoodList?.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell component="th" scope="row">
            {item.tenDoAn}
          </TableCell>
          <TableCell align="center">
            <img style={{ width: "30%" }} src={item.hinhAnh} alt="food" />{" "}
          </TableCell>
          <TableCell align="center" style={{ width: "20%" }}>
            <div className="comboType__item--quantity">
              <button
                className="btn__combo btn-decline"
                onClick={() => dispatch(optionalQuantity(item, false))}
              >
                -
              </button>
              <span className="combo__number"> {item.soLuong}</span>
              <button
                className="btn__combo btn-add"
                onClick={() => dispatch(optionalQuantity(item, true))}
              >
                +
              </button>
            </div>
          </TableCell>
          <TableCell align="center">
            {parseInt(item.gia).toLocaleString()}
          </TableCell>
          <TableCell align="center">
            {parseInt(item.soLuong * item.gia).toLocaleString()}
          </TableCell>
          <TableCell align="center">
            <Button
              className={classes.btnRemove}
              onClick={() => dispatch(deleteFood(item))}
            >
              <i class="fa fa-trash"></i>
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div>
      <button className="btn__cart" type="button" onClick={handleOpen}>
        <i class="fa fa-shopping-cart"></i> <span>Chi tiết đã chọn</span>
      </button>
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
            <Button className={classes.btnClose} onClick={handleClose}>
              X
            </Button>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead className={classes.thead}>
                  <TableRow>
                    <TableCell align="center">Tên</TableCell>
                    <TableCell align="center">Hình ảnh</TableCell>
                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="center">Đơn giá</TableCell>
                    <TableCell align="center">Thành tiền</TableCell>
                    <TableCell align="center">Tùy chọn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{ListCart()}</TableBody>
              </Table>
            </TableContainer>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
