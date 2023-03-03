import CopyButton from "../components/CopyButton";
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
      <CopyButton />
    </div>
  );
};

export default InputBox2;
