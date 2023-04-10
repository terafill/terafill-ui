import Navbar from "../components/Navbar";
import EmailCodeInputModalBox from "../components/EmailCodeInputModalBox";
import "./EmailConfirmation.css";

const EmailConfirmation = () => {

  return (
    <div className="emailconfirmation">
      <Navbar navbarType="signup"/>
      <div className="body1">
        <EmailCodeInputModalBox />
      </div>
    </div>
  );
};

export default EmailConfirmation;
