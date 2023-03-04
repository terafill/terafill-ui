import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";
import ProfileCard from "../components/ProfileCard";
import "./SettingsPersonalInfo.css";

const SettingsPersonalInfo = () => {
  return (
    <div className="settings-personal-info">
      <Navbar navbarType="app"/>
      <div className="apphomeinner7">
        <SettingsPanel activePanel="Personal Info" />
        <div className="rightpanel5">
          <div className="profileheader">
            <img
              className="iconoirprofile-circle"
              alt=""
              src="../iconoirprofilecircle.svg"
            />
            <b className="welcome-leonardo">Welcome, Leonardo</b>
          </div>
          <ProfileCard cardLabel="Basic Info" />
          <ProfileCard cardLabel="Contact Info" />
        </div>
      </div>
    </div>
  );
};

export default SettingsPersonalInfo;
