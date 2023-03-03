import { useMemo } from "react";
import "./ImportButton.css";

const ImportButton = ({
  buttonDerivativeBaseTop,
  buttonDerivativeBaseLeft,
  buttonDerivativeBaseJustifyContent,
  buttonDerivativeBaseBoxShadow,
  passwordDisplay,
  passwordFlexDirection,
  passwordAlignItems,
  passwordJustifyContent,
  passwordPosition,
  passwordWidth,
  passwordHeight,
  passwordFlexShrink,
  passwordIcon,
  passwordIconPosition,
  passwordIconWidth,
  passwordIconHeight,
  passwordIconFlexShrink,
  passwordIconTop,
  passwordIconLeft,
  label,
  passwordOverflow,
  passwordPadding,
  passwordBoxSizing,
  passwordIconObjectFit,
}) => {
  const buttonDerivativeBase1Style = useMemo(() => {
    return {
      top: buttonDerivativeBaseTop,
      left: buttonDerivativeBaseLeft,
      justifyContent: buttonDerivativeBaseJustifyContent,
      boxShadow: buttonDerivativeBaseBoxShadow,
    };
  }, [
    buttonDerivativeBaseTop,
    buttonDerivativeBaseLeft,
    buttonDerivativeBaseJustifyContent,
    buttonDerivativeBaseBoxShadow,
  ]);

  const passwordStyle = useMemo(() => {
    return {
      display: passwordDisplay,
      flexDirection: passwordFlexDirection,
      alignItems: passwordAlignItems,
      justifyContent: passwordJustifyContent,
      position: passwordPosition,
      width: passwordWidth,
      height: passwordHeight,
      flexShrink: passwordFlexShrink,
      overflow: passwordOverflow,
      padding: passwordPadding,
      boxSizing: passwordBoxSizing,
    };
  }, [
    passwordDisplay,
    passwordFlexDirection,
    passwordAlignItems,
    passwordJustifyContent,
    passwordPosition,
    passwordWidth,
    passwordHeight,
    passwordFlexShrink,
    passwordOverflow,
    passwordPadding,
    passwordBoxSizing,
  ]);

  const passwordIconStyle = useMemo(() => {
    return {
      position: passwordIconPosition,
      width: passwordIconWidth,
      height: passwordIconHeight,
      flexShrink: passwordIconFlexShrink,
      top: passwordIconTop,
      left: passwordIconLeft,
      objectFit: passwordIconObjectFit,
    };
  }, [
    passwordIconPosition,
    passwordIconWidth,
    passwordIconHeight,
    passwordIconFlexShrink,
    passwordIconTop,
    passwordIconLeft,
    passwordIconObjectFit,
  ]);

  return (
    <button
      className="buttonderivativebase30"
      style={buttonDerivativeBase1Style}
    >
      <button className="buttonroot31">
        <div className="password" style={passwordStyle}>
          <img
            className="password-icon"
            alt=""
            src={passwordIcon}
            style={passwordIconStyle}
          />
        </div>
        <div className="label34">{label}</div>
      </button>
    </button>
  );
};

export default ImportButton;
