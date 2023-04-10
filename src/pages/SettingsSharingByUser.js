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

  const activePanel = "By User";

  return (
    <div className="settings-sharing-byuser">
      <Navbar navbarType="app"/>
      <div className="apphomeinner4">
        <SettingsPanel activePanel="Sharing" />
        <div className="rightpanel2">
          <SearchInputBox />
          <b className="group-by">Group By</b>
          <nav className="groupbytogglebuttons">
            <Button buttonType="panel" label="By Password" buttonClassName={`${activePanel=="By Password" ? 'bg-gray-100' : ''}`}/>
            <Button buttonType="panel" label="By User" buttonClassName={`${activePanel=="By User" ? 'bg-gray-100' : ''}`}/>
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
