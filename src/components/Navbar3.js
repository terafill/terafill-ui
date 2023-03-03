import { useState, useRef, useCallback } from "react";
import NotificationsPopup from "../components/NotificationsPopup";
import PortalPopup from "../components/PortalPopup";
import ProfilePopup from "../components/ProfilePopup";
import "./Navbar3.css";

const Navbar3 = () => {
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
      <div className="navbar4" id="navbar">
        <div className="leftnavbar4">
          <div className="betalogo5">
            <img className="subtract-icon5" alt="" src="../subtract5.svg" />
            <div className="keylance5">Keylance</div>
          </div>
          <div className="menuitems4">
            <button className="buttonderivativebase18">
              <button className="buttonroot19">
                <img
                  className="iconxsmall19"
                  alt=""
                  src="../iconxsmall@2x.png"
                />
                <div className="label21">Products</div>
              </button>
            </button>
            <button className="buttonderivativebase18">
              <button className="buttonroot19">
                <img
                  className="iconxsmall19"
                  alt=""
                  src="../iconxsmall@2x.png"
                />
                <div className="label21">Whitepaper</div>
              </button>
            </button>
            <button className="buttonderivativebase18">
              <button className="buttonroot19">
                <img
                  className="iconxsmall19"
                  alt=""
                  src="../iconxsmall@2x.png"
                />
                <div className="label21">{`Download `}</div>
              </button>
            </button>
          </div>
        </div>
        <div className="rightnavbar4">
          <button
            className="buttonderivativebase21"
            ref={buttonDerivativeBase3Ref}
            onClick={openNotificationsPopup}
          >
            <button className="buttonroot22">
              <img className="iconxsmall22" alt="" src="../iconxsmall36.svg" />
              <div className="label24">Label</div>
            </button>
          </button>
          <button
            className="buttonderivativebase21"
            ref={buttonDerivativeBase4Ref}
            onClick={openProfilePopup}
          >
            <button className="buttonroot22">
              <div className="iconxsmall23">
                <img className="vector-icon5" alt="" src="../vector3.svg" />
              </div>
              <div className="label24">Label</div>
            </button>
          </button>
        </div>
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

export default Navbar3;
