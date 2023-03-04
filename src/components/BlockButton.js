import { useMemo } from "react";
import "./BlockButton.css";

const BlockButton = ({ iconXSmall, labelDisplay }) => {

  const label1Style = useMemo(() => {
    return {
      display: labelDisplay,
    };
  }, [labelDisplay]);

  return (
    <div className="buttonderivativebase17">
      <button className="buttonroot18">
        <img className="iconxsmall18" alt="" src={iconXSmall} />
        <div className="label19" style={label1Style}>
          Block
        </div>
      </button>
    </div>
  );
};

export default BlockButton;
