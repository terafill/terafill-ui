import { useState, useCallback } from "react";
import SignoutPopup from "../components/SignoutPopup";
import PortalPopup from "../components/PortalPopup";
import MenuItem from "../components/MenuItem";
import "./Menu.css";

const Menu = () => {
  const [isSignoutPopupOpen, setSignoutPopupOpen] = useState(false);

  const openSignoutPopup = useCallback(() => {
    setSignoutPopupOpen(true);
  }, []);

  const closeSignoutPopup = useCallback(() => {
    setSignoutPopupOpen(false);
  }, []);

  return (
    <>
      <div className="menu">
        <MenuItem menuItem="Home" />
        <MenuItem menuItem="Settings" />
        <MenuItem menuItem="Download App" />
        <MenuItem menuItem="Import" />
        <MenuItem menuItem={`Help & Support`} />
        <MenuItem menuItem="Sign Out" openSignoutPopup={openSignoutPopup} />
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

export default Menu;
