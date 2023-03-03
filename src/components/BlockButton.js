import { useMemo } from "react";
import "./BlockButton.css";

const BlockButton = ({ iconXSmall, buttonRootBoxSizing, labelDisplay }) => {
  const buttonRoot1Style = useMemo(() => {
    return {
      boxSizing: buttonRootBoxSizing,
    };
  }, [buttonRootBoxSizing]);

  const label1Style = useMemo(() => {
    return {
      display: labelDisplay,
    };
  }, [labelDisplay]);

  return (
    <div className="buttonderivativebase17">
      <button className="buttonroot18" style={buttonRoot1Style}>
        <img className="iconxsmall18" alt="" src={iconXSmall} />
        <div className="label19" style={label1Style}>
          Block
        </div>
      </button>
    </div>
  );
};

export default BlockButton;
