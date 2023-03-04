import Button from "../components/Button";
import "./KeylanceFooterContainer.css";

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
          <Button
            label="FAQ"
            buttonType="link"
          />
          <Button
            label="00-000-00000"
            buttonType="link"
          />
          <Button
            label="support@keylance.in"
            buttonType="link"
          />
        </div>
        <div className="socialmediagroup" id="contact-group">
          <b className="contact-us">CONTACT US</b>
          <div className="buttongroup3" id="ButtonGroup">
            <a className="twittericon">
              <img className="vector-icon" alt="" src="../twitter.svg" />
            </a>
            <a className="facebookicon">
              <img className="vector-icon1" alt="" src="../vector1.svg" />
            </a>
            <a className="instagramicon">
              <img className="vector-icon2" alt="" src="../vector2.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeylanceFooterContainer;
