import Button from "../components/Button";
import "./KeylanceFooterContainer.css";

import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";


const KeylanceFooterContainer = () => {
  return (
    <div className="footer" id="footer">
      <div className="logo">
        <div className="betalogo1">
          <img className="subtract-icon1" alt="" src="../subtract1.svg" />
          <div className="keylance1">Keylance</div>
        </div>
        <i className="login-faster">login faster</i>
      </div>
      <div className="rightfooter" id="right-footer">
        <div className="supportgroup" id="support-group">
          <h6 className="support" id="Support">
            SUPPORT
          </h6>
          <Button buttonType="link" to="/faq" label="FAQ" />
          <a href="tel:+00-000-00000"><Button buttonType="link" label="00-000-00000" /></a>
          <a href="mailto:support@keylance.in"><Button buttonType="link" label="support@keylance.in" /></a>
        </div>
        <div className="socialmediagroup" id="contact-group">
          <b className="contact-us">CONTACT US</b>
          <div className="buttongroup3" id="ButtonGroup">
            <a href='https://twitter.com' target="_blank" rel="noopener noreferrer"><BsTwitter/></a>
            <a href='https://facebook.com' target="_blank" rel="noopener noreferrer"><BsFacebook/></a>
            <a href='https://instagram.com' target="_blank" rel="noopener noreferrer"><BsInstagram/></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeylanceFooterContainer;
