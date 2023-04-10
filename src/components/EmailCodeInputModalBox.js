import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import "./EmailCodeInputModalBox.css";

const EmailCodeInputModalBox = () => {

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
          <Button buttonType="link" label="Re-send verification code" />
          <Button buttonType="link" to="/signup" label="Change email address" />
      </div>
      <div className="buttongroup6">
        <Button  buttonType="navbarLink" to="/signup" label="Back"/>
        <Button  buttonType="navbarLink" to="/create-password" label="Next"/>
      </div>
    </form>
  );
};

export default EmailCodeInputModalBox;
