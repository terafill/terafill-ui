import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmailCodeInputModalBox from "../components/EmailCodeInputModalBox";
import "./EmailConfirmation.css";

const EmailConfirmation = () => {
  const navigate = useNavigate();

  const onButtonClick = useCallback(() => {
    navigate("/create-password");
  }, [navigate]);

  const onButtonDerivativeBase5Click = useCallback(() => {
    navigate("/create-password");
  }, [navigate]);

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
