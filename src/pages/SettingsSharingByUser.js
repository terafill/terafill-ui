import Navbar2 from "../components/Navbar2";
import SettingsPanel from "../components/SettingsPanel";
import SearchInputBox from "../components/SearchInputBox";
import Button from "../components/Button";
import SharingCard from "../components/SharingCard";
import "./SettingsSharingByUser.css";

const SettingsSharingByUser = () => {
  return (
    <div className="settings-sharing-byuser">
      <Navbar2 />
      <div className="apphomeinner4">
        <SettingsPanel />
        <div className="rightpanel2">
          <SearchInputBox />
          <b className="group-by">Group By</b>
          <nav className="groupbytogglebuttons">
            <Button
              label="By Password"
              buttonDerivativeBaseOverflow="unset"
              buttonRootBackgroundColor="transparent"
              buttonRootBoxShadow="unset"
              labelColor="#3f9bf1"
              iconXSmall="../iconxsmall@2x.png"
            />
            <Button
              label="By User"
              buttonDerivativeBaseOverflow="unset"
              buttonRootBackgroundColor="#eee"
              buttonRootBoxShadow="0px 0px 4px rgba(0, 0, 0, 0.25) inset"
              labelColor="#3f9bf1"
              iconXSmall="../iconxsmall@2x.png"
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
