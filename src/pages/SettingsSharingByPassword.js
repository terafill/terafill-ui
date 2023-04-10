import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";
import SearchInputBox from "../components/SearchInputBox";
import Button from "../components/Button";
import Card from "../components/Card";
import "./SettingsSharingByPassword.css";

const SettingsSharingByPassword = () => {

  const passwordDataList = [
    {
      id: 1,
      passwordAppName: "Netflix",
      passwordUserName: "leonardo@keylance.in",
      passwordIcon: "../netflix.png",
      userList:[
        {
          userName: "Ram Kumar",
          userEmail: "ram@example.com"
        },
        {
          userName: "Karan Sharma",
          userEmail: "karan@example.com"
        }
      ]
    },
    {
      id: 2,
      passwordAppName: "Facebook",
      passwordUserName: "leo42",
      passwordIcon: "../facebook.png",
      userList:[
        {
          userName: "Ram Kumar",
          userEmail: "ram@example.com"
        },
        {
          userName: "Karan Sharma",
          userEmail: "karan@example.com"
        }
      ]
    },
    {
      id: 3,
      passwordAppName: "Twitter",
      passwordUserName: "davinci.leo123123",
      passwordIcon: "../twitter.svg",
      userList:[
        {
          userName: "Ram Kumar",
          userEmail: "ram@example.com"
        },
        {
          userName: "Karan Sharma",
          userEmail: "karan@example.com"
        }
      ]
    },
  ]

  const activePanel = "By Password";

  return (
    <div className="settings-sharing-bypassword">
      <Navbar navbarType="app"/>
      <div className="apphomeinner5">
        <SettingsPanel activePanel="Sharing" />
        <div className="rightpanel3">
          <SearchInputBox />
          <b className="group-by1">Group By</b>
          <nav className="groupbytogglebuttons1">
            <Button buttonType="panel" label="By Password" buttonClassName={`${activePanel=="By Password" ? 'bg-gray-100' : ''}`}/>
            <Button buttonType="panel" label="By User" buttonClassName={`${activePanel=="By User" ? 'bg-gray-100' : ''}`}/>
          </nav>

          {passwordDataList.map( passwordData =>
            <Card
              cardType="password"
              key={passwordData.id}
              icon={passwordData.passwordIcon}
              cardLabel={passwordData.passwordAppName}
              cardLabel2={passwordData.passwordUserName}
              cardBodyData={passwordData.userList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsSharingByPassword;
