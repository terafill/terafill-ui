import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordInputModalBox from "../components/PasswordInputModalBox";
import "./CreatePassword.css";

const CreatePassword = () => {
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate("/recovery-kit");
  }, [navigate]);

  const onButtonDerivativeBase5Click = useCallback(() => {
    navigate("/recovery-kit");
  }, [navigate]);

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
