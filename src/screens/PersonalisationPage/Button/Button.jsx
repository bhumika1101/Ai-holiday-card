import React, { useContext } from "react";

const Button = ({ children, ...props }) => {
  return (
    <button {...props}>
      <span data-hover={children[0]}>{children[0]}</span>
      {children[1]}
    </button>
  );
};

export default Button;
