import Navbar5 from "../components/Navbar5";
import SignUpInputModalBox from "../components/SignUpInputModalBox";
import "./SignUpPage.css";

const SignUpPage = () => {
  return (
    <div className="signuppage">
      <Navbar5 rightNavBarPadding="0px var(--padding-md)" />
      <div className="body3">
        <SignUpInputModalBox />
      </div>
    </div>
  );
};

export default SignUpPage;
