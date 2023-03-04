import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";
import SearchInputBox from "../components/SearchInputBox";
import Button from "../components/Button";
import SharingCard2 from "../components/SharingCard2";
import "./SettingsSharingByPassword.css";

const SettingsSharingByPassword = () => {
  return (
    <div className="settings-sharing-bypassword">
      <Navbar navbarType="app"/>
      <div className="apphomeinner5">
        <SettingsPanel activePanel="Sharing" />
        <div className="rightpanel3">
          <SearchInputBox />
          <b className="group-by1">Group By</b>
          <nav className="groupbytogglebuttons1">
            <Button
              label="By Password"
              buttonType="link"
              buttonBoxShadow="0px 0px 4px rgba(0, 0, 0, 0.25) inset"
            />
            <Button
              label="By User"
              buttonType="link"
            />
          </nav>
          <SharingCard2
            icon="../icon4@2x.png"
            appLabel="Netflix"
            username="leonardo@keylance.in"
          />
          <SharingCard2
            icon="../icon5@2x.png"
            appLabel="facebook"
            username="leo42"
          />
          <SharingCard2
            icon="../icon6@2x.png"
            appLabel="Twitter"
            username="davinci.leo123123"
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsSharingByPassword;
