import React from "react";
import Button from "react-bootstrap/Button";

const Btn = props => {
  const { handleClick, text, type, btnSize, margin } = props;

  return (
    <>
      <Button
        variant={type}
        onClick={handleClick}
        size={btnSize}
        className={margin}
      >
        {text}
      </Button>
    </>
  );
};

export default Btn;
