import Button from "../components/Button";
import "./InputBox2.css";

const InputBox2 = () => {
  return (
    <div className="inputbox-2">
      <div className="inputbox3">
        <label className="label7">Security Key</label>
        <p className="inputboxinner">
          <b className="enter-your-data">asdasd-qweqwe-12312asd--asd</b>
        </p>
      </div>
      <Button
        label="COPY"
        iconXSmall="../materialsymbolsfilecopyoutline.svg"
        iconXSmallDisplay="unset"
        iconPosition="right"
        buttonType="light"
      />
    </div>
  );
};

export default InputBox2;
