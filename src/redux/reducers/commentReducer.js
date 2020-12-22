const {
  FETCH_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
} = require("../types/types");

const initialState = {
  comment: [],
};

const commentReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case FETCH_COMMENT:
      state.comment = actions.payload;
      return { ...state };
      break;
    case ADD_COMMENT:
      {
        let update = [...state.comment];
        update.push(actions.payload);
        state.comment = update;
        return { ...state };
      }
      break;
    case DELETE_COMMENT:
      {
        let update = [...state.comment];
        update.splice(actions.payload, 1);
        state.comment = update;
        return { ...state };
      }
      break;
    default:
      return { ...state };
      break;
  }
};
export default commentReducer;
