import InputBox2 from "../components/InputBox2";
import Button from "../components/Button";
import "./InputModalBox.css";

const InputModalBox = () => {
  return (
    <form className="inputmodalbox">
      <h4 className="download-account-recovery">
        Download account recovery kit
      </h4>
      <InputBox2 />
      <p className="note-copy-this">
        Note: Copy this secret key and keep it somewhere safe. It can help you
        recover your account in case you lose your master password.
      </p>
      <div className="buttongroup4">
        <Button
          label="Download Kit"
          buttonDerivativeBaseBoxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
          buttonDerivativeBaseOverflow="unset"
          iconXSmall="../iconxsmall13@2x.png"
        />
        <Button
          label="Finish Setup"
          buttonDerivativeBaseBoxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
          buttonDerivativeBaseOverflow="unset"
          iconXSmall="../iconxsmall13@2x.png"
        />
      </div>
    </form>
  );
};

export default InputModalBox;
