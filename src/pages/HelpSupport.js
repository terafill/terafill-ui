import Navbar2 from "../components/Navbar2";
import Button2 from "../components/Button2";
import Button from "../components/Button";
import "./HelpSupport.css";

const HelpSupport = () => {
  return (
    <div className="helpsupport">
      <Navbar2 />
      <div className="apphomeinner">
        <Button2 />
        <Button
          label="Submit a bug"
          buttonDerivativeBaseBoxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
          buttonDerivativeBaseOverflow="unset"
          buttonDerivativeBaseJustifyContent="center"
          buttonBackgroundColor="#fff"
          labelLineHeight="125%"
          labelColor="#000"
          iconXSmall="../iconxsmall20@2x.png"
          buttonDerivativeBasePosition="absolute"
          buttonDerivativeBaseWidth="8.83%"
          buttonDerivativeBaseTop="calc(50% - 290px)"
          buttonDerivativeBaseRight="43.17%"
          buttonDerivativeBaseLeft="48.01%"
          iconXSmallDisplay="unset"
        />
        <Button
          label="Contact customer care"
          buttonDerivativeBaseBoxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
          buttonDerivativeBaseOverflow="unset"
          buttonDerivativeBaseJustifyContent="center"
          buttonBackgroundColor="#fff"
          labelLineHeight="125%"
          labelColor="#000"
          iconXSmall="../iconxsmall21@2x.png"
          buttonDerivativeBasePosition="absolute"
          buttonDerivativeBaseWidth="8.83%"
          buttonDerivativeBaseTop="calc(50% - 290px)"
          buttonDerivativeBaseRight="19.94%"
          buttonDerivativeBaseLeft="71.23%"
          iconXSmallDisplay="unset"
        />
      </div>
    </div>
  );
};

export default HelpSupport;
