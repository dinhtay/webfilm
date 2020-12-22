import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../redux/actions/user.action";
import { useHistory } from "react-router-dom";

const useForm = (validateInfo) => {
  // const history = useHistory();
  // const handleUrl = () => {
  //   if (errors.length < 0) {
  //     history.push("/");
  //   }
  // };
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const [errors, setError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user, //Để đủ thuộc tính
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(validateInfo(user));
    if (user.taiKhoan !== "" && user.matKhau !== "") {
      dispatch(loginRequest(user, history));
    }
    //Post to API
  };

  return { handleChange, user, handleSubmit, errors };
};

export default useForm;
