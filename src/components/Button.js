import { useMemo } from "react";
import "./Button.css";

const Button = ({
  icon,
  label,
  buttonRootBackgroundColor,
  buttonRootBoxShadow,
  buttonRootBorder,
  keylanceWidth,
  keylanceHeight,
  labelFontSize,
  labelLineHeight,
  labelColor,
  buttonDerivativeBaseHeight,
  iconXSmall,
  iconXSmallDisplay,
  onButtonDerivativeBase4Click,
  iconXSmallObjectFit,
  iconXSmallOverflow,
  buttonRootBoxSizing,
  labelDisplay,
}) => {
  const buttonRootStyle = useMemo(() => {
    return {
      backgroundColor: buttonRootBackgroundColor,
      boxShadow: buttonRootBoxShadow,
      border: buttonRootBorder,
      boxSizing: buttonRootBoxSizing,
    };
  }, [
    buttonRootBackgroundColor,
    buttonRootBoxShadow,
    buttonRootBorder,
    buttonRootBoxSizing,
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

  return (
      <button className="button" style={buttonRootStyle}>
        <img
          className="iconxsmall"
          alt=""
          src={iconXSmall}
          style={iconXSmallStyle}
        />
        <div className="label" style={labelStyle}>
          {label}
        </div>
      </button>
  );
};

export default Button;
