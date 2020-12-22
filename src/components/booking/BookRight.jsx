import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { amountMoney, fetchFood } from "../../redux/actions/booking.actions";
import BookFood from "./BookFood";
import ModalFood from "./ModalFood";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  draw: {
    zIndex: "1",
    width: "200px",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  drawMobile: {
    zIndex: "1",
    width: "100%",
    height: "400px",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  button: {
    background: "#c5c5c5",
    fontSize: "20px",
    fontWeight: "bold",
    width: "40%",
    padding: "10px",
    margin: "2% 30%",
    "&:hover": {
      background: "#afafaf",
    },
  },
  text: {
    fontSize: "18px",
    color: "#fb4226",
    fontWeight: "600",
    margin: "5px 0",
  },
  btnClose: {
    fontSize: "20px",
    fontWeight: "700",
    color: "red",
  },
  anchor: {
    marginRight: "33.33%",
  },
  paperAnchorRight: {
    marginRight: "33.33%",
  },
}));

export default function BookRight() {
  const classes = useStyles();
  const cartFoodList = useSelector(
    (state) => state.bookingReducer.cartFoodList
  );
  const [open, setOpen] = useState(false);
  const handlelDrawer = () => {
    setOpen(true);
  };
  const handleLink = () => {
    setOpen(false);
  };

  let foodList = useSelector((state) => state.bookingReducer.foodList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFood());
  }, []);

  let sum = 0;
  const renderAmountMoney = () => {
    return cartFoodList
      .reduce((tongTien, item, index) => {
        sum = tongTien += item.soLuong * item.gia;
        return sum;
      }, 0)
      .toLocaleString();
    return sum;
  };

  const renderListFood=()=>{
    return(
      <> <Button className={classes.btnClose} onClick={handleLink}>
      X
    </Button>
    <div className="comboList__comboItem">
      <div className="comboItem__comboType">
        <h3 className="comboItem__comboType--title">
          Đồ ăn và thức uống
        </h3>
        <BookFood foodList={foodList} />
        <div>
          <ModalFood />
        </div>
        <div>
          <p className={classes.text}>
            Tổng tiền: {renderAmountMoney()}{" "}
          </p>
          <Button
            className={classes.button}
            onClick={() => {
              dispatch(amountMoney(sum));
              setOpen(false);
            }}
          >
           Chọn
          </Button>
        </div>
      </div>
    </div> </>
    )
  }

  return (
    <div className={classes.root}>
      <p onClick={handlelDrawer}>
        <img src="../images/popcorn.png" alt="popcorn" />
        <span>Chọn combo</span>
      </p>

      <Drawer
        className={classes.draw}
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="comboList">
         {renderListFood()}
        </div>
      </Drawer>

      {/* Mobile */}
      <Drawer
        className={classes.drawMobile}
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="comboList">
         {renderListFood()}
        </div>
      </Drawer>
    </div>
  );
}
