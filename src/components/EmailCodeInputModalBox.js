import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import "./EmailCodeInputModalBox.css";

const EmailCodeInputModalBox = () => {
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate("/create-password");
  }, [navigate]);

  const onButtonDerivativeBase5Click = useCallback(() => {
    navigate("/create-password");
  }, [navigate]);

  return (
    <form className="signupbox">
      <h4 className="verify-your-email">Verify your email address</h4>
      <p className="enter-verification-code-container">
        <span className="enter-verification-code-container1">
          <span className="enter-verification-code">
            Enter verification code sent to email address
          </span>
          <b className="enter-verification-code"> harshitsaini@keylance.in</b>
        </span>
      </p>
      <InputBox
        label="Verification Code"
        inputBoxInnerPlaceholder="Enter verification code here ..."
      />
      <div className="buttongroup5">
        <Button
          label="Re-send verification code"
          buttonDerivativeBaseOverflow="unset"
          buttonBackgroundColor="transparent"
          buttonBoxShadow="unset"
          labelColor="#3f9bf1"
          iconXSmall="../iconxsmall42@2x.png"
        />
        <Button
          label="Change email address"
          buttonDerivativeBaseOverflow="unset"
          buttonBackgroundColor="transparent"
          buttonBoxShadow="unset"
          labelColor="#3f9bf1"
          iconXSmall="../iconxsmall42@2x.png"
        />
      </div>
      <div className="buttongroup6">
        <Button
          label="Back"
          buttonDerivativeBaseBoxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
          buttonDerivativeBaseOverflow="unset"
          iconXSmall="../iconxsmall13@2x.png"
          buttonDerivativeBaseWidth="57px"
          onButtonClick={onButtonClick}
          buttonDerivativeBaseFlexShrink="0"
        />
        <Button
          label="Next"
          buttonDerivativeBaseBoxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
          buttonDerivativeBaseOverflow="unset"
          iconXSmall="../iconxsmall13@2x.png"
          buttonDerivativeBaseWidth="57px"
          onButtonClick={onButtonDerivativeBase5Click}
          buttonDerivativeBaseFlexShrink="0"
        />
      </div>
    </form>
  );
};

export default EmailCodeInputModalBox;
