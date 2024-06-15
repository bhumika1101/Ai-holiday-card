import React, { useState } from "react";

//SCSS
import "./button-style.scss";

export default function Button({ buttonLabel, ...buttonProps }) {
  const [isHovered, setIsHovered] = useState(false);

  const onFocus = () => {
    setIsHovered(true);
  };

  const onBlur = () => {
    setIsHovered(false);
  };

  const image = isHovered
    ? `${process.env.REACT_APP_CONTENT}/images/left-arrow.svg`
    : `${process.env.REACT_APP_CONTENT}/images/black-left-arrow.svg`;
  return (
    <>
      <button onMouseEnter={onFocus} onMouseLeave={onBlur} {...buttonProps}>
        <span data-hover={buttonLabel}>{buttonLabel}</span>
        {/* {buttonLabel} */}
        <img src={image} />
      </button>
    </>
  );
}
