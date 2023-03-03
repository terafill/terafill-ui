import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../components/Navbar1";
import EmailCodeInputModalBox from "../components/EmailCodeInputModalBox";
import "./EmailConfirmation.css";

const EmailConfirmation = () => {
  const navigate = useNavigate();

  const onButtonDerivativeBase4Click = useCallback(() => {
    navigate("/create-password");
  }, [navigate]);

  const onButtonDerivativeBase5Click = useCallback(() => {
    navigate("/create-password");
  }, [navigate]);

  return (
    <div className="emailconfirmation">
      <Navbar1 />
      <div className="body1">
        <EmailCodeInputModalBox />
      </div>
    </div>
  );
};

export default EmailConfirmation;
