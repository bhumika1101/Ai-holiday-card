import React from "react";
import { STOREDATA } from "../action/action.type";
const myNewState = JSON.parse(sessionStorage.getItem("dataMapping"));
const reducer = (state = [], action) => {
  // console.log(JSON.stringify(state));
  switch (action.type) {
    case STOREDATA:
      let newState = {
        ...state,
        [action.name]: [action.payload],
      };
    // case "storeStyleData":
    //   newState = {
    //     ...state,
    //     [action.name]: {
    //       ...[action.name],
    //       style: action.payload,
    //     },
    //   };

      sessionStorage.setItem("dataMapping", JSON.stringify(newState));
      return newState;
    // case RESET_CONTEXT:
    //   sessionStorage.setItem("dataMapping", JSON.stringify([]))
    //   return []

    default:
      sessionStorage.setItem("dataMapping", JSON.stringify(state));
      return state;
  }
};
export default reducer;

// dispatchData({
//     name: "detailsDetails",
//     keyName: "Country",
//     type: STOREDATA,
//     payload: countryValue
// });
