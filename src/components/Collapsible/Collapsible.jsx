import React from "react";
import styles from "./Collapsible.module.scss";
import Btn from "../Button";
import { useState } from "react";

const Collapsible = props => {
  const { text } = props;
  const [isOpen, toggleOpen] = useState(false);

  const togglePanel = () => {
    toggleOpen(!isOpen);
  };

  return (
    <>
      <Btn
        handleClick={togglePanel}
        type="info"
        text="Toggle additiona info"
        btnSize="sm"
      />
      {isOpen ? <p className={styles.addInfo}>{text}</p> : null}
    </>
  );
};

export default Collapsible;
