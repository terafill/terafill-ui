import Navbar from "../components/Navbar";
import Button from "../components/Button";
import "./HelpSupport.css";

const HelpSupport = () => {
  return (
    <div className="helpsupport">
      <Navbar navbarType="app"/>
      <div className="apphomeinner">
        <Button
          label="Request a feature"
          buttonType="light"
          iconXSmall="../iconxsmall21@2x.png"
          iconXSmallDisplay="unset"
        />
        <Button
          label="Submit a bug"
          buttonType="light"
          iconXSmall="../iconxsmall21@2x.png"
          iconXSmallDisplay="unset"
        />
        <Button
          label="Contact customer care"
          buttonType="light"
          iconXSmall="../iconxsmall21@2x.png"
          iconXSmallDisplay="unset"
        />
      </div>
    </div>
  );
};

export default HelpSupport;
