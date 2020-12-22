import React from "react";
import { useDispatch } from "react-redux";
import { addFood } from "../../redux/actions/booking.actions";

export default function BookFood(props) {
  const { foodList } = props;
  console.log(foodList);
  const dispatch = useDispatch();

  return foodList.map((item, index) => {
    return (
      <div className="comboType__item" key={index}>
        <div className="comboType__item-img">
          <img src={item.hinhAnh} alt />
        </div>
        <div className="comboType__item--iteminfo">
          <div className="combo__item--name">
            <p>{item.tenDoAn}</p>
          </div>
          <div className="combo__item--price">
            <span>Đơn giá: {parseInt(item.gia).toLocaleString()}đ</span>
          </div>
        </div>
        <div className="comboType__item--btn">
          <button
            onClick={() => {
              dispatch(addFood(item));
            }}
          >
            Chọn
          </button>
        </div>
      </div>
    );
  });
}
