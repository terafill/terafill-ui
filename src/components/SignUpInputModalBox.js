import InputBox from "../components/InputBox";
import Button from "../components/Button";
import "./SignUpInputModalBox.css";

const SignUpInputModalBox = () => {
  return (
    <form className="inputmodalbox2">
      <h4 className="use-keylance-for">Use Keylance for free</h4>
      <InputBox
        inputBoxBoxSizing="unset"
        inputBoxAlignSelf="stretch"
        label="Name"
        labelWidth="unset"
        labelAlignSelf="stretch"
        inputBoxInnerPlaceholder="Enter your full name ..."
        inputBoxInnerWidth="unset"
        inputBoxInnerAlignSelf="stretch"
      />
      <InputBox
        inputBoxBoxSizing="unset"
        inputBoxAlignSelf="stretch"
        label="Email"
        labelWidth="unset"
        labelAlignSelf="stretch"
        inputBoxInnerPlaceholder="Enter your email address ..."
        inputBoxInnerWidth="unset"
        inputBoxInnerAlignSelf="stretch"
      />
      <Button buttonType="navbarLink" to="/email-confirmation" label="Create Account"/>
    </form>
  );
};

export default SignUpInputModalBox;
