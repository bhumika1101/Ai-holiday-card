import React, { useContext, useEffect, useState } from "react";
import "./personalisation-page-style.scss";
import Footer from "./Footer";
import ThemeContext from "../../context/ThemeContext";
import Content from "./Content/Content";
import { useNavigate } from "react-router-dom";
import getStyleDetails from "../../Apis/get-style-details";
import getGenreDetails from "../../Apis/get-genre-details";

import { useMemo } from "react";
import { STOREDATA } from "../../context/DataMapping/action/action.type";
import DataMapping from "../../context/DataMapping";

const PersonalisationPage = () => {
  const [content] = useContext(ThemeContext);
  const [, dispatchData, ,] = useContext(DataMapping);
  const [animation, setAnimation] = useState("");
  const [location] = useState(false);
  const [genreDetails, setGenreDetails] = useState([]);
  const [styleDetails, setStyleDetails] = useState([]);
  const navigate = useNavigate();
  const [BgImg, setBgImg] = useState({
    firstBgImg: "",
    secondBgImg: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    getGenreDetailsApiCall();
    getStyleDetailsApiCall();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getGenreDetailsApiCall = () => {
    let requestObject = {
      header: {},
      body: {},
    };
    getGenreDetails(requestObject)
      .then((response) => {
        console.log("Genre response : ", response);
        if (response.header.status.toUpperCase() == "SUCCESS") {
          setGenreDetails(response.body.genre);
        } else {
          navigate("/error-page");
        }
      })
      .catch((error) => {
        navigate("/error-page");
      });
  };
  const getStyleDetailsApiCall = () => {
    let requestObject = {
      header: {},
      body: {},
    };
    getStyleDetails(requestObject)
      .then((response) => {
        if (response.header.status == "SUCCESS") {
          setStyleDetails(response.body.image);
        } else {
          navigate("/error-page");
        }
      })
      .catch((error) => {
        navigate("/error-page");
      });
  };

  useEffect(() => {
    switch (content) {
      case 0:
        setTimeout(() => {
          setAnimation("begin");
        }, 500);
        return setBgImg({
          ...BgImg,
          firstBgImg: "helix",
          secondBgImg: "arc",
        });
      case 1:
        return setBgImg({
          ...BgImg,
          firstBgImg: "circle",
          secondBgImg: "triangle",
        });
      case 2:
        return setBgImg({
          ...BgImg,
          firstBgImg: "shuriken",
          secondBgImg: "helix2",
        });
      case 3:
        return windowWidth < 1024
          ? setBgImg({
              ...BgImg,
              firstBgImg: "helix3",
              secondBgImg: "arc",
            })
          : setBgImg({
              ...BgImg,
              firstBgImg: "helix3",
              secondBgImg: "arc2",
            });
      case 4:
        return setBgImg({
          ...BgImg,
          firstBgImg: "helix4",
          secondBgImg: "shuriken2",
        });
      case 5:
        return setAnimation("fadeOut");

      default:
        break;
    }
  }, [content]);

  function generateRandomOptionsArray(demoarr) {
    let darr = [];
    for (let index = 0; index < 10; index++) {
      let crntOption = demoarr[Math.floor(Math.random() * 20)];
      if (!darr.includes(crntOption)) {
        darr.push(crntOption);
      }
      if (darr.length == 3) {
        return darr;
      }
    }
  }

  function renderContentComponents() {
    switch (content) {
      case 0:
        return (
          <Content
            key={Math.random()}
            header={"Are you ready for a festive adventure?"}
            desc={
              "Before we can bring the tale to life, I need your help. Once I've gathered your answers, the story can begin..."
            }
            variant={0}
          />
        );
      case 1:
        return (
          <Content
            key={Math.random()}
            header={`${
              location ? "Which country are you from?" : "Where are you based?"
            }`}
            desc={
              "This will help me set the scene in either a stunning summer or a winter wonderland for your holiday season!"
            }
            variant={1}
          />
        );
      case 2:
        return (
          <Content
            key={Math.random()}
            header={
              "What end-of-the-year traditions are essential for your ultimate festive season?"
            }
            desc={
              "Maybe there's music and dancing? Some beloved sweet treats? Perhaps a feast with family and friends?"
            }
            variant={2}
          />
        );
      case 3:
        return (
          <Content
            key={"genre"}
            header={"What genre should your story be?"}
            desc={`Are you in the mood for a New Year's romance or are you looking for some holiday hijinks?
            Choose from our suggestions, or  you can chose different options to respond to the story but genre is an upfront question`}
            options={genreDetails}
            variant={"genre"}
          />
        );
      case 4:
      case 5:
      case 6:
        return (
          <Content
            key={"style"}
            header={"Finally, which style of image do you prefer?"}
            desc={"Choose from some of our favorite looks, or pick your own."}
            options={styleDetails}
            variant={"style"}
          />
        );

      default:
        break;
    }
  }

  const renderContentCallback = useMemo(renderContentComponents, [content]);

  return (
    <div className={`personalisation-container ${animation}`}>
      {renderContentCallback}
      <img
        src={`./content/images/${BgImg.firstBgImg}.svg`}
        alt="helixImage"
        className={`persnlstnImage1 layout-variant-${content} ${animation}`}
      />
      <img
        src={`./content/images/${BgImg.secondBgImg}.svg`}
        alt="arcImage"
        className={`persnlstnImage2 layout-variant-${content} ${animation}`}
      />
      <Footer screenWidth={windowWidth} />
    </div>
  );
};

export default PersonalisationPage;
