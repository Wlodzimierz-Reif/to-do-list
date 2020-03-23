import React from "react";
import styles from "./InputField.module.scss";

const InputField = props => {
  const { setItem, placeholder, type } = props;

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        onInput={event => setItem(event.target.value)}
      />
    </>
  );
};

export default InputField;
