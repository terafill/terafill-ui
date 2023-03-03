import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import "./PasswordInputModalBox.css";

const PasswordInputModalBox = () => {
  const navigate = useNavigate();

  const onButtonDerivativeBase4Click = useCallback(() => {
    navigate("/recovery-kit");
  }, [navigate]);

  const onButtonDerivativeBase5Click = useCallback(() => {
    navigate("/recovery-kit");
  }, [navigate]);

  return (
    <form className="inputmodalbox1">
      <h4 className="create-your-master">Create your master password</h4>
      <InputBox
        inputBoxBoxSizing="unset"
        inputBoxAlignSelf="stretch"
        label="Master Password"
        labelWidth="unset"
        labelAlignSelf="stretch"
        inputBoxInnerPlaceholder="Enter master password here ..."
        inputBoxInnerWidth="unset"
        inputBoxInnerAlignSelf="stretch"
      />
      <InputBox
        inputBoxBoxSizing="unset"
        inputBoxAlignSelf="stretch"
        label="Re-enter passowrd"
        labelWidth="unset"
        labelAlignSelf="stretch"
        inputBoxInnerPlaceholder="Re-enter password here ..."
        inputBoxInnerWidth="unset"
        inputBoxInnerAlignSelf="stretch"
      />
      <p className="note-memorise-this">
        Note: Memorise this password and keep it safe.
      </p>
      <div className="buttonderivativebase-parent">
        <Button
          label="Back"
          buttonDerivativeBaseOverflow="unset"
          iconXSmall="../iconxsmall@2x.png"
          buttonDerivativeBaseWidth="57px"
          onButtonDerivativeBase4Click={onButtonDerivativeBase4Click}
          buttonDerivativeBaseFlexShrink="0"
        />
        <Button
          label="Next"
          buttonDerivativeBaseOverflow="unset"
          iconXSmall="../iconxsmall@2x.png"
          buttonDerivativeBaseWidth="57px"
          onButtonDerivativeBase4Click={onButtonDerivativeBase5Click}
          buttonDerivativeBaseFlexShrink="0"
        />
      </div>
    </form>
  );
};

export default PasswordInputModalBox;
