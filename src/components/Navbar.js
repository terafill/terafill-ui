import Button from "../components/Button";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar" id="navbar">
      <div className="leftnavbar" id="LeftNavBar">
        <div className="betalogo">
          <img className="subtract-icon" alt="" src="../subtract.svg" />
          <div className="keylance">Keylance</div>
        </div>
        <div className="menuitems" id="ButtonGroup">
          <Button label="Products" iconXSmall="../iconxsmall@2x.png" />
          <Button label="Whitepaper" iconXSmall="../iconxsmall@2x.png" />
          <Button label="Download " iconXSmall="../iconxsmall@2x.png" />
        </div>
      </div>
      <div className="rightnavbar" id="ButtonGroup">
        <Button label="Login" iconXSmall="../iconxsmall@2x.png" />
        <Button
          label="Sign Up"
          buttonRootBackgroundColor="#fff"
          labelColor="#000"
          iconXSmall="../iconxsmall@2x.png"
        />
      </div>
    </div>
  );
};

export default Navbar;
