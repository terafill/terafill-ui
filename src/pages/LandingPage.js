import Navbar from "../components/Navbar";
import Button from "../components/Button";
import KeylanceFooterContainer from "../components/KeylanceFooterContainer";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="intro-section">
        <div className="leftintrosection" id="left-Intro-section">
          <div className="introsectiontext" id="intro-section-text">
            <h4 className="forgot-your-password" id="heading">
              Forgot your password again?
            </h4>
            <p className="keylance-password-manager" id="para">
              Keylance Password Manager can help you store all your passwords
              effortlessly. Enjoy a fast and secure login experience with
              Keylance Login Manager.
            </p>
          </div>
          <div className="buttongroup" id="button-group">
            <Button
              label="Use Keylance for free"
              buttonDerivativeBaseOverflow="unset"
              buttonDerivativeBaseJustifyContent="center"
              buttonDerivativeBaseHeight="37px"
              iconXSmall="../iconsmall.svg"
            />
            <Button
              label="Learn more"
              buttonDerivativeBaseBoxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              buttonDerivativeBaseOverflow="unset"
              buttonDerivativeBaseJustifyContent="center"
              iconXSmall="../iconsmall.svg"
            />
          </div>
        </div>
        <img
          className="rightintrosection-icon"
          alt=""
          src="../right-intro-section@2x.png"
        />
      </div>
      <div className="madeinindiasection" id="made-in-india-section">
        <div
          className="madeinindiainfographic"
          id="india-infographic-container"
        >
          <b className="made-with-love-container">
            <span>{`Made with `}</span>
            <span className="love">love</span>
            <span> in India</span>
          </b>
          <img
            className="abstract-indian-flag-png-free"
            alt=""
            src="../india-flag@2x.png"
          />
        </div>
      </div>
      <div className="indiamapsection" id="India-map-section">
        <div className="datacenterinfo" id="data-centre-info-container">
          <b className="we-store-data">
            We store data securely in data centres located in Delhi and
            Bangalore
          </b>
          <img
            className="codiconworkspace-trusted"
            alt=""
            src="../trusted-icon.svg"
          />
        </div>
        <img
          className="indiamap-icon"
          alt=""
          src="../india-map-tagged@2x.png"
        />
      </div>
      <div className="loginfastersection" id="login-faster-section">
        <div className="buttonmesh" id="ButtonMesh">
          <div className="buttongroup1" id="ButtonGroup">
            <Button
              buttonDerivativeBaseOverflow="unset"
              iconXSmall="../iconsmall2.svg"
            />
            <Button
              buttonDerivativeBaseOverflow="unset"
              iconXSmall="../iconsmall3.svg"
            />
            <Button
              buttonDerivativeBaseOverflow="unset"
              iconXSmall="../iconsmall2.svg"
            />
          </div>
          <div className="buttongroup2" id="ButtonGroup">
            <Button
              buttonDerivativeBaseBoxShadow="0px 2px 4px rgba(51, 51, 51, 0.25)"
              buttonDerivativeBaseOverflow="unset"
              iconXSmall="../iconsmall2.svg"
            />
            <Button
              buttonDerivativeBaseOverflow="unset"
              iconXSmall="../iconsmall2.svg"
            />
          </div>
        </div>
        <div className="loginfasterinfographic" id="LoginFasterInfographic">
          <img
            className="initialscreen-icon"
            alt=""
            src="../login-faster-initial-screen@2x.png"
          />
          <div className="time">
            <b className="second">{`< 1 second`}</b>
            <img className="time-child" alt="" src="../arrow-1.svg" />
          </div>
          <img
            className="initialscreen-icon"
            alt=""
            src="../login-faster-after-login-screen@2x.png"
          />
        </div>
      </div>
      <KeylanceFooterContainer />
    </div>
  );
};

export default LandingPage;
