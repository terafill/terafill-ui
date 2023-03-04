import Button from "../components/Button";
import "./Navbar.css";

const Navbar = ({ navbarType="landing" }) => {
  return (
    <div className="navbar" id="navbar">
      <div className="leftnavbar" id="LeftNavBar">
        <div className="betalogo">
          <img className="subtract-icon" alt="" src="../subtract.svg" />
          <div className="keylance">Keylance</div>
        </div>
        <div className="menuitems" id="ButtonGroup">
          <Button label="Products" buttonType="dark"/>
          <Button label="Whitepaper" buttonType="dark"/>
          <Button label="Download " buttonType="dark"/>
        </div>
      </div>
      {(navbarType === "landing") || ( navbarType ==="signup")?
        <div className="rightnavbar">
          <Button label="Login" buttonType="dark"/>
          {navbarType === "signup" ? "":
            <Button label="Sign Up" buttonType="light"/>}
        </div>
        : ""
      }
      {navbarType === "app"?
        <div className="rightnavbar">
          <Button
            buttonType="dark"
            iconXSmall="../bell.svg"
            iconXSmallDisplay="unset"
            labelDisplay="none"
          />
          <Button
            buttonType="dark"
            iconXSmall="../profile.svg"
            iconXSmallDisplay="unset"
            labelDisplay="none"
          />
        </div>
        : ""
      }
    </div>
  );
};

export default Navbar;
