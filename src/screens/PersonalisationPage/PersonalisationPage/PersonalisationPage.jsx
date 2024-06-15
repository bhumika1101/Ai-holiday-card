import React, { useContext, useEffect, useState } from "react";
import "./PersonalisationPage.scss";
import Header from "../Header";
import Footer from "../Footer";
import ThemeContext from "../ThemeContext";
import Content from "../Content/Content";

const PersonalisationPage = () => {
  const [content, setContent] = useContext(ThemeContext);
  const [BgImg, setBgImg] = useState({
    firstBgImg: "helix",
    secondBgImg: "arc",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    switch (content) {
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

      default:
        break;
    }
  }, [content]);

  function renderContentComponents() {
    switch (content) {
      case 0:
        // setfirstBgImg("helix");
        return (
          <Content
            key={Math.random()}
            header={
              "Great! Let’s get started on our festive adventure. First, I have a few quick questions:"
            }
            desc={
              "Once I have your answers, we'll dive right into our holiday-themed, humorous adventure!"
            }
            variant={0}
          />
        );
      case 1:
        // setfirstBgImg("circle");
        return (
          <Content
            key={Math.random()}
            header={"Are you currently located in Mumbai India?"}
            desc={
              "This helps me set the scene as a summer or winter festive environment. "
            }
            variant={1}
          />
        );
      case 2:
        // setfirstBgImg("shuriken");
        // bgImage[0] = "shuriken";
        // bgImage[1] = "helix2";
        return (
          <Content
            key={Math.random()}
            header={
              "Do you have any special holiday traditions that you follow at the end of the year?"
            }
            desc={
              "This helps me set the scene as a summer or winter festive environment. "
            }
            variant={2}
          />
        );
      case 3:
        // bgImage[0] = "helix3";
        // bgImage[1] = "arc2";
        return (
          <Content
            key={Math.random()}
            header={"What genre would you like the story to be?"}
            desc={
              "Feel free to pick your own genre if you don't find any options you like from our suggestions."
            }
            options={["Sci-Fi", "Fantasy", "Adventure"]}
            variant={3}
          />
        );
      case 4:
        // bgImage[0] = "helix4";
        // bgImage[1] = "shuriken2";
        return (
          <Content
            key={Math.random()}
            header={"and What style of image do you prefer?"}
            desc={
              "Feel free to pick your own genre if you don't find any options you like from our suggestions."
            }
            options={["Pop art", "8-bit pixel art", "Digital 3D art"]}
            variant={4}
          />
        );

      default:
        break;
    }
  }
  return (
    <div className="personalisation-container">
      {/* <div className="bgImage-container"></div> */}
      <Header />
      {renderContentComponents()}
      <img
        src={`./assets/images/${BgImg.firstBgImg}.svg`}
        alt="helixImage"
        className={`persnlstnImage1 layout-variant-${content}`}
      />
      <img
        src={`./assets/images/${BgImg.secondBgImg}.svg`}
        alt="arcImage"
        className={`persnlstnImage2 layout-variant-${content}`}
      />
      {/* <div className="content">
        <div className="text-container">
          <p className="text-header">
            Great! Let’s get started on our festive adventure. First, I have a
            few quick questions:
          </p>
          <p className="text-desc">
            Once I have your answers, we'll dive right into our holiday-themed,
            humorous adventure!
          </p>
          <ul className="suggestion-list">
            <li>
              <span>Options lorem ipsum</span>
              <img src="./assets/images/arrow.svg" alt="arrowIcon" />
            </li>
            <li>
              <span>Options lorem ipsum</span>
              <img src="./assets/images/arrow.svg" alt="arrowIcon" />
            </li>
            <li>
              <span>Options lorem ipsum</span>
              <img src="./assets/images/arrow.svg" alt="arrowIcon" />
            </li>
          </ul>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default PersonalisationPage;
