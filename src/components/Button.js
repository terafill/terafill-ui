import { useMemo } from "react";
import "./Button.css";

const Button = ({
  icon,
  label,
  buttonDerivativeBaseBoxShadow,
  buttonDerivativeBaseOverflow,
  buttonDerivativeBaseJustifyContent,
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
  buttonDerivativeBasePosition,
  buttonDerivativeBaseWidth,
  buttonDerivativeBaseTop,
  buttonDerivativeBaseRight,
  buttonDerivativeBaseLeft,
  iconXSmallDisplay,
  onButtonDerivativeBase4Click,
  buttonDerivativeBaseFlexShrink,
  iconXSmallObjectFit,
  iconXSmallOverflow,
  buttonRootBoxSizing,
  labelDisplay,
}) => {
  const buttonDerivativeBaseStyle = useMemo(() => {
    return {
      boxShadow: buttonDerivativeBaseBoxShadow,
      overflow: buttonDerivativeBaseOverflow,
      justifyContent: buttonDerivativeBaseJustifyContent,
      height: buttonDerivativeBaseHeight,
      position: buttonDerivativeBasePosition,
      width: buttonDerivativeBaseWidth,
      top: buttonDerivativeBaseTop,
      right: buttonDerivativeBaseRight,
      left: buttonDerivativeBaseLeft,
      flexShrink: buttonDerivativeBaseFlexShrink,
    };
  }, [
    buttonDerivativeBaseBoxShadow,
    buttonDerivativeBaseOverflow,
    buttonDerivativeBaseJustifyContent,
    buttonDerivativeBaseHeight,
    buttonDerivativeBasePosition,
    buttonDerivativeBaseWidth,
    buttonDerivativeBaseTop,
    buttonDerivativeBaseRight,
    buttonDerivativeBaseLeft,
    buttonDerivativeBaseFlexShrink,
  ]);

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
    <button
      className="buttonderivativebase"
      style={buttonDerivativeBaseStyle}
      onClick={onButtonDerivativeBase4Click}
    >
      <button className="buttonroot" style={buttonRootStyle}>
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
    </button>
  );
};

export default Button;
