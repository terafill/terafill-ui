import Navbar from "../components/Navbar";
import PasswordInputModalBox from "../components/PasswordInputModalBox";
import "./CreatePassword.css";

const CreatePassword = () => {

  return (
    <div className="createpassword">
      <Navbar navbarType="signup"/>
      <div className="body2">
        <PasswordInputModalBox />
      </div>
    </div>
  );
};

export default CreatePassword;
