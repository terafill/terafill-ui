import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";
import SearchInputBox from "../components/SearchInputBox";
import Button from "../components/Button";
import SharingCard from "../components/SharingCard";
import "./SettingsSharingByUser.css";

const SettingsSharingByUser = () => {
  return (
    <div className="settings-sharing-byuser">
      <Navbar navbarType="app"/>
      <div className="apphomeinner4">
        <SettingsPanel activePanel="Sharing" />
        <div className="rightpanel2">
          <SearchInputBox />
          <b className="group-by">Group By</b>
          <nav className="groupbytogglebuttons">
            <Button
              label="By Password"
              buttonType="link"
            />
            <Button
              label="By User"
              buttonType="link"
              buttonBoxShadow="0px 0px 4px rgba(0, 0, 0, 0.25) inset"
            />
          </nav>
          <SharingCard appLabel="Ram Kumar" username="ram@example.com" />
          <SharingCard
            cardOverflow="unset"
            appLabel="Karan Sharma"
            username="karan@example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsSharingByUser;
