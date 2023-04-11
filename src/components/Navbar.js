import { useState, useRef, useCallback } from "react";
import NotificationsPopup from "../components/NotificationsPopup";
import PortalPopup from "../components/PortalPopup";
import ProfilePopup from "../components/ProfilePopup";
import Button from "../components/Button";
import { Link } from 'react-router-dom';


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
    <div
      className="self-stretch bg-black shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] flex flex-row items-center justify-between text-center text-[33.18px] text-font-light font-dm-serif-display"
      id="navbar">
      <div className="flex flex-row items-center justify-start gap-[24px]" id="left-navbar">
        <div className="relative w-[200px] h-12 shrink-0">
          <img
            className="absolute top-[8px] left-[8px] w-7 h-7"
            alt=""
            src="/subtract.svg"
          />
          <Link to="/" className="text-white absolute top-[8px] left-[44px] flex items-center justify-center w-[136px] h-7">
            Keylance
          </Link>
        </div>
        { (navbarType === "landing") || ( navbarType ==="signup")?
        <div className="flex flex-row items-center justify-center gap-[16px] lg:items-center lg:justify-start lg:pl-[7%] lg:box-border" id="ButtonGroup">
          <Button buttonType="navbarLink" to="/products" label="Products" />
          <Button buttonType="navbarLink" to="/pricing" label="Pricing" />
          <Button buttonType="navbarLink" to="/whitepaper" label="Whitepaper" />
        </div>

        : ""
        }
      </div>
      {(navbarType === "landing") || ( navbarType ==="signup")?
        <div className="flex flex-row px-4 items-center justify-center gap-[8px]">
          <Button buttonType="navbarLink" to="/login" label="Login" />
          {navbarType === "signup" ? "":
            <Button buttonType="navbarLink" to="/signup" label="Sign Up" buttonClassName="bg-white hover:bg-gray-300" labelClassName="text-black"/>
                  }
        </div>
        : ""
      }
      {navbarType === "app"?
        <div className="box-border flex flex-row px-4 items-center justify-center gap-[8px] border-l-[0.8px]">
          <button
            className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-row items-center justify-start"
            // ref={buttonDerivativeBase3Ref}
            onClick={openNotificationsPopup}
          >
            <button className="cursor-pointer [border:none] py-2 px-2 bg-gray hover:bg-gray-800 rounded-xl shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] flex flex-row items-center justify-center gap-[8px]">
              <img
                className="relative w-6 h-6 shrink-0"
                alt=""
                src="/bell.svg"
              />
            </button>
          </button>
          <button
            className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-row items-center justify-start"
            // ref={buttonDerivativeBase3Ref}
            onClick={openProfilePopup}
          >
            <button className="cursor-pointer [border:none] py-2 px-2 bg-gray hover:bg-gray-800 rounded-xl shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] flex flex-row items-center justify-center gap-[8px]">
              <img
                className="relative w-6 h-6 shrink-0"
                alt=""
                src="/profile.svg"
              />
            </button>
          </button>
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
