import Navbar from "../components/Navbar";
import SignUpInputModalBox from "../components/SignUpInputModalBox";
import "./SignUpPage.css";

const SignUpPage = () => {
  return (
    <div className="signuppage">
      <Navbar navbarType="signup"/>
      <div className="body3">
        <SignUpInputModalBox />
      </div>
    </div>
  );
};

export default SignUpPage;
