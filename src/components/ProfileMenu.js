import { memo, useState, useCallback } from "react";
import SignoutPopup from "../components/SignoutPopup";
import PortalPopup from "../components/PortalPopup";
import { MenuItem } from "../components/Menu";
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';
import axios from 'axios';

const ProfileMenu = memo(({ onClose }) => {
  const [isSignoutPopupOpen, setSignoutPopupOpen] = useState(false);
  const navigate = useNavigate();

  const logoutUser = () => {
    var data = JSON.stringify({
      access_token: Cookies.get("accessToken"),
    });

    console.log(`http://localhost:8000/api/v1/auth/logout`);

    var config = {
      method: 'post',
      url: `http://localhost:8000/api/v1/auth/logout`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data : data
    };

    return axios(config);
 }

  const onSignoutConfirm = useCallback(() => {
        // Signout
        logoutUser().then(function (response) {
            Cookies.remove('accessToken');
            Cookies.remove('idToken');
            Cookies.remove('refreshToken');
            console.log("Session cleaned up!");

            })
            .catch(function (error) {
              console.log(error);
              if (error.response.data.hasOwnProperty('detail')){
                const error_msg = error.response.data.detail;
                console.log(error_msg);
                alert([error_msg]);
              }
              else{
                alert([`Something went wrong: ${error}.`]);
              }
            });
        navigate("/");
  }, []);

  const openSignoutPopup = useCallback(() => {
    setSignoutPopupOpen(true);
  }, []);

  const closeSignoutPopup = useCallback(() => {
    setSignoutPopupOpen(false);
  }, []);

  return (
    <>
      <div className="relative shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] rounded-md bg-white overflow-hidden flex flex-col items-center justify-center max-w-full max-h-full">
          <div className="px-2 py-2 w-[200px] overflow-hidden flex flex-col items-center justify-center gap-2">
            <MenuItem menuItem="Home" onClick={()=>navigate("/app-home")}/>
            <MenuItem menuItem="Settings" onClick={()=>navigate("/settings")}/>
            <MenuItem menuItem="Download App" />
            <MenuItem menuItem="Import" onClick={()=>navigate("/import")}/>
            <MenuItem menuItem={`Help & Support`} onClick={()=>navigate("/help-and-support")} />
            <MenuItem menuItem="Sign Out" onClick={openSignoutPopup} />
          </div>
      </div>
      {isSignoutPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignoutPopup}
        >
           <SignoutPopup
            onConfirm={onSignoutConfirm}
            onClose={closeSignoutPopup}
            />
        </PortalPopup>
      )}
    </>
  );
});

export default ProfileMenu;
