import React, { useContext, useReducer, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Loader from "./components/Loader";
import "./App.scss";
import LoaderContext from "./context/Loader/Loader";
import reducer from "./context/DataMapping/reducer";
import DataMapping from "./context/DataMapping";

function App() {
  const location = useLocation();
  const [loader, setLoader] = useContext(LoaderContext);
  const sessionData = JSON.parse(sessionStorage.getItem("dataMapping"));
  const [personalisationData, setPersonalisationData] = useState({
    country: "",
    eod: "",
    genre: "",
    style: "",
  });
  const [data, dispatchData] = useReducer(
    reducer,
    sessionData ? sessionData : []
  );

  const gradientClass = () => {
    if (location.pathname == "/" || location.pathname.includes("/summary")) {
      return "yellow-purple-gradient";
    } else if (location.pathname.includes("/summary")) {
      return "yellow-purple-gradient";
    } else if (
      location.pathname.includes("/home-page") ||
      location.pathname.includes("/holiday-page")
    ) {
      return "blue-orange-gradient";
    } else if (
      location.pathname.includes("/personalisation") ||
      location.pathname.includes("/error-page") ||
      location.pathname.includes("/system-shutdown")
    ) {
      return "biege-background";
    } else if (location.pathname.includes("/creative-hub")) {
      return "purple-green-gradient";
    } else {
      return "purple-yellow-gradient";
    }
    // switch (location.pathname) {
    //   case "/":
    //     return "yellow-purple-gradient";
    //   case "/cover-page":
    //     return "purple-yellow-gradient";

    //   case "/home-page":
    //     return "blue-orange-gradient";

    //   case "/personalisation":
    //   case "/personalisation/location":
    //   case "/personalisation/genre":
    //   case "/personalisation/holiday":
    //   case "/personalisation/image":
    //     return "biege-background";

    //   case "/creative-hub":
    //     return "purple-green-gradient";

    //   case "/holiday-page":
    //     return "blue-orange-gradient";

    //   case "/error-page":
    //     return "biege-background";

    //   case "/system-shutdown":
    //     return "biege-background";

    //   case "/summary":
    //     return "yellow-purple-gradient";

    //   default:
    //     return "purple-yellow-gradient";
    // }
  };

  // const pageFullWidth = () => {
  //   if (location.pathname.includes("/home-page")) {
  //     return "fullHeight";
  //   }
  // };
  return (
    <div className={`App ${gradientClass()} `}>
      <DataMapping.Provider
        value={[
          data,
          dispatchData,
          personalisationData,
          setPersonalisationData,
        ]}
      >
        <div className="react-root-container">
          {loader && <Loader />}
          <Header />
          {AppRoutes()}
        </div>
      </DataMapping.Provider>
    </div>
  );
}

export default App;
