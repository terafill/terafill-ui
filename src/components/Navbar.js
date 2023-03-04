import { useState, useRef, useCallback } from "react";
import NotificationsPopup from "../components/NotificationsPopup";
import PortalPopup from "../components/PortalPopup";
import ProfilePopup from "../components/ProfilePopup";
import Button from "../components/Button";
import "./Navbar.css";

const Navbar = ({ navbarType="landing" }) => {

  const buttonDerivativeBase3Ref = useRef(null);
  const [isNotificationsPopupOpen, setNotificationsPopupOpen] = useState(false);
  const buttonDerivativeBase4Ref = useRef(null);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

  const openNotificationsPopup = useCallback(() => {
    setNotificationsPopupOpen(true);
  }, []);

  const closeNotificationsPopup = useCallback(() => {
    setNotificationsPopupOpen(false);
  }, []);

  const openProfilePopup = useCallback(() => {
    setProfilePopupOpen(true);
  }, []);

  const closeProfilePopup = useCallback(() => {
    setProfilePopupOpen(false);
  }, []);

  return (
  <>
    <div className="navbar" id="navbar">
      <div className="leftnavbar" id="LeftNavBar">
        <div className="betalogo">
          <img className="subtract-icon" alt="" src="../subtract.svg" />
          <div className="keylance">Keylance</div>
        </div>
        { (navbarType === "landing") || ( navbarType ==="signup")?
        <div className="menuitems" id="ButtonGroup">
          <Button label="Products" buttonType="dark"/>
          <Button label="Whitepaper" buttonType="dark"/>
          <Button label="Download " buttonType="dark"/>
        </div>: ""
        }
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
            // ref={buttonDerivativeBase3Ref}
            onButtonClick={openNotificationsPopup}
          />
          <Button
            buttonType="dark"
            iconXSmall="../profile.svg"
            iconXSmallDisplay="unset"
            labelDisplay="none"
            // ref={buttonDerivativeBase4Ref}
            onButtonClick={openProfilePopup}
          />
        </div>
        : ""
      }
    </div>
     {isNotificationsPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom right"
          right={8}
          bottom={24}
          relativeLayerRef={buttonDerivativeBase3Ref}
          onOutsideClick={closeNotificationsPopup}
        >
          <NotificationsPopup onClose={closeNotificationsPopup} />
        </PortalPopup>
      )}
      {isProfilePopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Bottom right"
          right={8}
          bottom={24}
          relativeLayerRef={buttonDerivativeBase4Ref}
          onOutsideClick={closeProfilePopup}
        >
          <ProfilePopup onClose={closeProfilePopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default Navbar;
