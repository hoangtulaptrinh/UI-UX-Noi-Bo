import actionTypes from '../const/actionTypes';

var initialState = {};
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setCurrentUser:
      return action.payload;

    default:
      return state;
  }
}

export default myReducer;