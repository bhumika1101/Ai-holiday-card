import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "./Button";

import "./creative-hub-style.scss";
import { useNavigate, useParams } from "react-router-dom";
import LoaderContext from "../../context/Loader/Loader";
import DataMapping from "../../context/DataMapping";
import { STOREDATA } from "../../context/DataMapping/action/action.type";
import conversation from "../../Apis/conversation";
import OpenAiTextCreation from "../../utility/OpenAiTextCreation";
import ThemeContext from "../../context/ThemeContext";

export default function CreativeHub() {
  const { client_name } = useParams();
  const [loader, setLoader] = useContext(LoaderContext);
  const [, setContent] = useContext(ThemeContext);
  const [animation, setAnimation] = useState("");
  const [story, setStory] = useState({
    text: "",
    image: "",
  });
  const [userInput, setUserInput] = useState("");
  let [stepCount, setStepCount] = useState(1);
  const [optionSet, setOptionSet] = useState([]);
  const [data, dispatchData] = useContext(DataMapping);
  console.log(data);
  const [messages, setMessages] = useState(
    data.initResponse ? data.initResponse[0].messages : []
  );

  const containerRef = useRef();

  // debugger;
  const navigate = useNavigate();
  useEffect(() => {
    let story = `storyData${stepCount}`;

    if (stepCount != 1) {
      let updatedMessages = [];
      setLoader(true);
      setStory((crntObj) => {
        return {
          ...crntObj,
          image: "",
        };
      });

      switch (stepCount) {
        case 2:
          let stepTwoData = [
            {
              role: "assistant",
              content: JSON.stringify(data?.storyData1[0]?.promptMessage),
            },
            {
              role: "user",
              content: userInput,
            },
          ];
          updatedMessages = [...messages, ...stepTwoData];
          updateMessageState(stepTwoData);
          break;

        case 3:
          let stepThreeData = [
            {
              role: "assistant",
              content: JSON.stringify(data?.storyData2[0]?.promptMessage),
            },
            {
              role: "user",
              content: userInput,
            },
          ];
          updatedMessages = [...messages, ...stepThreeData];
          updateMessageState(stepThreeData);
          break;

        case 4:
          let stepFourData = [
            {
              role: "assistant",
              content: JSON.stringify(data?.storyData3[0]?.promptMessage),
            },
            {
              role: "user",
              content: userInput + "Let's end the story",
            },
          ];
          updatedMessages = [...messages, ...stepFourData];
          updateMessageState(stepFourData);
          break;
      }

      let requestObject = {
        header: {
          storyInit: false,
          clientId: client_name ? client_name : "",
          step: stepCount,
          storyId: data?.storyData1[0].storyId,
        },
        body: {
          messages: updatedMessages,
        },
      };

      conversation(requestObject)
        .then((response) => {
          // console.log(response, stepCount);
          if (response.header.status.toUpperCase() === "SUCCESS") {
            containerRef.current?.scrollTo({ top: -500, behavior: "smooth" });
            dispatchData({
              name: story,
              type: STOREDATA,
              payload: {
                promptMessage: response?.body?.promptMessage,
                promptImage: response.body.promptImage,
                userInput: userInput,
              },
            });
            let responseStory = {
              0: {
                promptMessage: response?.body?.promptMessage,
                promptImage: response.body.promptImage,
              },
            };
            if (stepCount !== 4) {
              splitStorynOptions(responseStory);
              setStory((crntObj) => {
                return {
                  ...crntObj,
                  text: response.body.promptMessage,
                  image: response.body.promptImage,
                };
              });
              setLoader(false);
            } else {
              endAnimation();
            }
            setUserInput("");
          } else {
            setLoader(false);
            if (client_name) {
              navigate(`/${client_name}/error-page`);
            } else {
              navigate(`/error-page`);
            }
          }
        })
        .catch((error) => {
          setLoader(false);
          if (client_name) {
            navigate(`/${client_name}/error-page`);
          } else {
            navigate(`/error-page`);
          }
        });
    }

    if (data.storyData1 && stepCount == 1) {
      splitStorynOptions(data.storyData1);
    } else if (data.storyData1 == undefined) {
      if (client_name) {
        navigate(`/${client_name}/error-page`);
      } else {
        navigate(`/error-page`);
      }
    }
    // console.log(story);
  }, [stepCount]);

  let updateMessageState = (updatedData) => {
    setMessages((prev) => {
      return [...prev, ...updatedData];
    });
  };

  function splitStorynOptions(storyData) {
    console.log(storyData);
    let optionArr = [],
      storyText = "";

    OpenAiTextCreation(storyData[0].promptMessage)
      .split("<br>")
      .forEach((data) => {
        console.log("Options: ", data);
        if (data.toLowerCase().includes("option ") && optionArr.length <= 2) {
          if (data.split(":")[1].trim()) {
            optionArr.push(
              data
                .replace("<br>", "")
                .replace(
                  /(Option \d+:)/,
                  '<strong class="bold-font">$1</strong>'
                )
            );
          }
        }
      });
    /*  if (optionArr.length == 0) {
       storyData[0].promptMessage.split(/\d\.\s/).map((data) => {
         // console.log(data);
         if (data.toLowerCase().includes(".")) {
           optionArr.push(data);
         } else {
           storyText += data + "/n";
         }
       });
     } */

    console.log(story?.text.split("Option")[0]);
    setStory({
      ...story,
      text: storyData[0].promptMessage,
      image: storyData[0].promptImage,
    });
    setOptionSet(optionArr);
  }
  function updateStepCount(value) {
    if (value.toLowerCase().includes("choose your own action")) {
      console.log("option 3");
      setUserInput("Option 3: Choose your action by typing here");
    } else if (value.trim() !== "") {
      setUserInput(value);
      setStepCount((crntCount) => crntCount + 1);
      console.log(value);
    }
  }
  function endAnimation() {
    setLoader(false);
    setAnimation("end");
    setTimeout(() => {
      if (data.clientDetails[0].response) {
        navigate(`/${client_name}/holiday-page`);
      } else {
        navigate(`/holiday-page`);
      }
    }, 1000);
  }
  useEffect(() => {
    setTimeout(() => {
      containerRef.current?.scrollTo({ top: -500, behavior: "smooth" });
    }, 100);
    setContent(0);
  }, []);

  return (
    <div className={`creativeHub-main-container ${animation}`}>
      <div className="creativeHub-sub-container">
        <div ref={containerRef} className="creativeHub-primary-container">
          <div className="creativeHub-primary-left-container">
            <div className="creativeHub-primary-content">
              <p
                dangerouslySetInnerHTML={{
                  __html: OpenAiTextCreation(story?.text, true).split(
                    "Option"
                  )[0],
                }}
              ></p>
            </div>
            <div className="creativeHub-primary-options-container">
              {optionSet.map((option, index) => {
                return (
                  <div
                    className="creativeHub-primary-option"
                    key={index}
                    onClick={() =>
                      updateStepCount(
                        option.replace(/<strong[^>]*>(.*?)<\/strong>/g, "$1")
                      )
                    }
                  >
                    {/* <h4> */}
                    {/* <span>Option 1: </span> */}
                    {/* {option}
                    </h4> */}

                    <h4
                      dangerouslySetInnerHTML={{
                        __html: OpenAiTextCreation(option),
                      }}
                    ></h4>
                  </div>
                );
              })}
            </div>
            {/*  <span class="suggestion-span">
              Feel free to pick your own genre if you don't find any options you
              like from our suggestions.
            </span> */}
          </div>
          <div className="creativeHub-secondary-right-container">
            <img
              className="dummy-image"
              src={
                story.image
                  ? story.image
                  : `${process.env.REACT_APP_CONTENT}/images/image-bg-texture.svg`
              }
            />
          </div>
        </div>

        <div className="footer-container">
          <div className="footer-left-container">
            <p className="option3">
              <strong className="bold-font">Option 3:</strong> Type your own
              Story!
            </p>
            <div className="footer-left-content">
              <div className="footer-left-sub-content">
                <textarea
                  onKeyPress={(e) => {
                    if (e.key == "Enter") {
                      updateStepCount(e.target.value);
                    }
                  }}
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="footer-right-container">
            <Button
              onClick={() => setStepCount((count) => count + 1)}
              buttonLabel="Next"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
