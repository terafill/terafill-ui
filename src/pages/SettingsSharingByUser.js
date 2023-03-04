import Navbar from "../components/Navbar";
import SettingsPanel from "../components/SettingsPanel";
import SearchInputBox from "../components/SearchInputBox";
import Button from "../components/Button";
import Card from "../components/Card";
import "./SettingsSharingByUser.css";

const SettingsSharingByUser = () => {

  const userDataList = [
    {
      id: 1,
      userName: "Ram Kumar",
      userEmailName: "ram@example.com",
      passwordList:[
        {
          passwordAppName: "Netflix",
          passwordUserName: "leonardo@keylance.in"
        },
        {
          passwordAppName: "Facebook",
          passwordUserName: "leo42"
        }
      ]
    },
    {
      id: 2,
      userName: "Karan Sharma",
      userEmailName: "karan@example.com",
      passwordList:[
        {
          passwordAppName: "Netflix",
          passwordUserName: "leonardo@keylance.in"
        },
        {
          passwordAppName: "Facebook",
          passwordUserName: "leo42"
        }
      ]
    },
  ]

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
          {userDataList.map( userData =>
            <Card
              cardType="user"
              key={userData.id}
              cardLabel={userData.userName}
              cardLabel2={userData.userEmailName}
              cardBodyData={userData.passwordList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsSharingByUser;
