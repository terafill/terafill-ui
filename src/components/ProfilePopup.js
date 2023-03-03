import { useState, useCallback } from "react";
import SignoutPopup from "../components/SignoutPopup";
import PortalPopup from "../components/PortalPopup";
import Menu from "../components/Menu";
import "./ProfilePopup.css";

const ProfilePopup = ({ onClose }) => {
  const [isSignoutPopupOpen, setSignoutPopupOpen] = useState(false);

  const openSignoutPopup = useCallback(() => {
    setSignoutPopupOpen(true);
  }, []);

  const closeSignoutPopup = useCallback(() => {
    setSignoutPopupOpen(false);
  }, []);

  return (
    <>
      <div className="profilepopup">
        <Menu />
      </div>
      {isSignoutPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignoutPopup}
        >
          <SignoutPopup onClose={closeSignoutPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default ProfilePopup;
