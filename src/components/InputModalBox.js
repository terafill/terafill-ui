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
        <Button buttonType="dark" label="Download Kit"/>
        <Button buttonType="navbarLink" to="/app-home" label="Finish Setup"/>
      </div>
    </form>
  );
};

export default InputModalBox;
