import React, { useContext, useEffect } from "react";
import ThemeContext from "../../../context/ThemeContext";
import DataMapping from "../../../context/DataMapping";
import { STOREDATA } from "../../../context/DataMapping/action/action.type";

const Content = ({ header, desc, options, variant }) => {
  const [content, setContent] = useContext(ThemeContext);
  const [data, dispatchData, personalisationData, setPersonalisationData] =
    useContext(DataMapping);

  function generateImageName(whitespaceName) {
    return whitespaceName.replaceAll(" ", "-").toLowerCase();
  }
  useEffect(() => {
    dispatchData({
      name: "userDetails",
      keyName: "userInputs",
      type: STOREDATA,
      payload: personalisationData,
    });
  }, [personalisationData]);

  function updateData(event, type) {
    setContent((count) => count + 1);

    if (event.currentTarget) {
      if (type == "style") {
        let typeOption = event.currentTarget.dataset.option;
        let typeDefination = event.currentTarget.dataset.optionid;

        setPersonalisationData((data) => {
          return {
            ...data,
            [type]: typeOption,
            defination: typeDefination,
          };
        });
      } else {
        let typeOption = event.currentTarget.dataset.option;
        setPersonalisationData((data) => {
          return {
            ...data,
            [type]: typeOption,
          };
        });
      }
    }
  }
  return (
    <div className="content">
      <div className="text-container">
        <p className="text-header">{header}</p>
        <p className="text-desc">{desc}</p>
        <ul className="suggestion-list">
          {options !== undefined &&
            options.map((option, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => {
                    updateData(e, variant);
                  }}
                  data-option={option["name"]}
                  data-optionId={option["defination"]}
                >
                  <span>{option["name"]}</span>
                  <img src="./content/images/arrow.svg" alt="arrowIcon" />
                  <img
                    src={option["icon"]}
                    alt={option["icon"] + "Image"}
                    className="previewImage"
                  />
                </li>
              );
            })}
        </ul>
      </div>
      {/* <img
        src={`./content/images/helix.svg`}
        alt="helixImage"
        className={`persnlstnImage1 layout-variant-${variant}`}
      />
      <img
        src={`./content/images/arc.svg`}
        alt="arcImage"
        className={`persnlstnImage2 layout-variant-${variant}`}
      /> */}
    </div>
  );
};

export default Content;
