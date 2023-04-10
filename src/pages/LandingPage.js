import Navbar from "../components/Navbar";
import KeylanceFooterContainer from "../components/KeylanceFooterContainer";
import "./LandingPage.css";
import Button  from '../components/Button';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar navbarType="landing"/>
      <div className="intro-section">
        <div className="leftintrosection" id="left-Intro-section">
          <div className="introsectiontext" id="intro-section-text">
            <h4 className="heading" id="heading">
              Forgot your password again?
            </h4>
            <p className="para" id="para">
              Keylance Password Manager can help you store all your passwords
              effortlessly. Enjoy a fast and secure login experience with
              Keylance Login Manager.
            </p>
          </div>
          <div className="buttongroup" id="button-group">
            <Button buttonType="navbarLink" to="/signup" label="Use Keylance for free" buttonClassName="py-2 px-4"/>
            <Button buttonType="navbarLink" to="/" label="Learn more" buttonClassName="py-2 px-4 bg-white py-2 px-4 hover:bg-gray-100 ring-1 ring-black" labelClassName="text-black"/>
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
          <Button buttonType="dark" label="Desktop" buttonClassName="py-2 px-4"/>
          <Button buttonType="dark" label="Android" buttonClassName="py-2 px-4"/>
          <Button buttonType="dark" label="iOS" buttonClassName="py-2 px-4"/>
          </div>
          <div className="buttongroup2" id="ButtonGroup">
            <Button buttonType="dark" label="WearOS" buttonClassName="py-2 px-4"/>
            <Button buttonType="dark" label="WatchOS" buttonClassName="py-2 px-4"/>
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
