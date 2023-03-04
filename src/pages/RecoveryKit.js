import Navbar from "../components/Navbar";
import InputModalBox from "../components/InputModalBox";
import "./RecoveryKit.css";

const RecoveryKit = () => {
  return (
    <div className="recoverykit">
      <Navbar navbarType="signup"/>
      <div className="body">
        <InputModalBox />
      </div>
    </div>
  );
};

export default RecoveryKit;
