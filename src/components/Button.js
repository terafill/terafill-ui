import { useMemo } from "react";
import styles from "./Button.module.css";

const Button = ({
  icon,
  label,
  buttonType,
  buttonBackgroundColor,
  buttonBoxShadow,
  buttonBorder,
  buttonPadding,
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
  iconPosition="left",
}) => {
  const buttonStyle = useMemo(() => {
    return {
      backgroundColor: buttonBackgroundColor,
      boxShadow: buttonBoxShadow,
      border: buttonBorder,
      padding: buttonPadding,
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
    case "red":
      buttonStyleClass = styles.redButton;
      break;
    case "blue":
      buttonStyleClass = styles.blueButton;
      break;
    case "add":
      buttonStyleClass = styles.blueButton;
      break;
    case "link":
      buttonStyleClass = styles.linkButton;
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
    case "red":
      labelStyleClass = styles.lightLabel;
      break;
    case "blue":
      labelStyleClass = styles.lightLabel;
      break;
    case "add":
      labelStyleClass = styles.lightLabel;
      break;
    case "link":
      labelStyleClass = styles.blueLabel;
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
        {iconPosition==="left"?<img
          className={styles.iconxsmall}
          alt=""
          src={iconXSmall}
          style={iconXSmallStyle}
        />: ""}
        <label className={labelStyleClass} style={labelStyle}>
          {label}
        </label>
        {iconPosition==="right"?<img
          className={styles.iconxsmall}
          alt=""
          src={iconXSmall}
          style={iconXSmallStyle}
        />: ""}
      </button>
  );
};

export default Button;
