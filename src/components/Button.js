import { useMemo } from "react";
import styles from "./Button.module.css";

const Button = ({
  icon,
  label,
  buttonType,
  buttonBackgroundColor,
  buttonBoxShadow,
  buttonBorder,
  keylanceWidth,
  keylanceHeight,
  labelFontSize,
  labelLineHeight,
  labelColor,
  iconXSmall,
  iconXSmallDisplay,
  onButtonClick,
  iconXSmallObjectFit,
  iconXSmallOverflow,
  labelDisplay,
}) => {
  const buttonStyle = useMemo(() => {
    return {
      backgroundColor: buttonBackgroundColor,
      boxShadow: buttonBoxShadow,
      border: buttonBorder,
    };
  }, [
    buttonBackgroundColor,
    buttonBoxShadow,
    buttonBorder,
  ]);

  const labelStyle = useMemo(() => {
    return {
      fontSize: labelFontSize,
      lineHeight: labelLineHeight,
      color: labelColor,
      display: labelDisplay,
    };
  }, [labelFontSize, labelLineHeight, labelColor, labelDisplay]);

  const iconXSmallStyle = useMemo(() => {
    return {
      display: iconXSmallDisplay,
      objectFit: iconXSmallObjectFit,
      overflow: iconXSmallOverflow,
    };
  }, [iconXSmallDisplay, iconXSmallObjectFit, iconXSmallOverflow]);

  var buttonStyleClass = styles.darkButton;

  switch(buttonType) {
    case "light":
      buttonStyleClass = styles.lightButton;
      break;
    default:
      buttonStyleClass = styles.darkButton;
      // statements_def
      break;
  }

  var labelStyleClass = styles.darkLabel;

  switch(buttonType) {
    case "light":
      labelStyleClass = styles.darkLabel;
      break;
    default:
      labelStyleClass = styles.lightLabel;
      // statements_def
      break;
  }

  return (
      <button
        className={buttonStyleClass}
        style={buttonStyle}
        onClick={onButtonClick}
        >
        <img
          className={styles.iconxsmall}
          alt=""
          src={iconXSmall}
          style={iconXSmallStyle}
        />
        <label className={labelStyleClass} style={labelStyle}>
          {label}
        </label>
      </button>
  );
};

export default Button;
