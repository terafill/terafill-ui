import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar5 from "../components/Navbar5";
import PasswordInputModalBox from "../components/PasswordInputModalBox";
import "./CreatePassword.css";

const CreatePassword = () => {
  const navigate = useNavigate();

  const onButtonDerivativeBase4Click = useCallback(() => {
    navigate("/recovery-kit");
  }, [navigate]);

  const onButtonDerivativeBase5Click = useCallback(() => {
    navigate("/recovery-kit");
  }, [navigate]);

  return (
    <div className="createpassword">
      <Navbar5 />
      <div className="body2">
        <PasswordInputModalBox />
      </div>
    </div>
  );
};

export default CreatePassword;
