import Navbar from "../../components/Navbar";
import SettingsPanel from "../../components/SettingsPanel";
import SearchInputBox from "../../components/SearchInputBox";
import Button from "../../components/Button";
import Card from "../../components/Card";

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
      <div className="self-stretch flex-1 overflow-y-auto flex flex-col py-8 px-40 items-center justify-start gap-[32px] z-[0]">
        <SearchInputBox />
        <b className="relative leading-[120%]">Group By</b>
        <nav className="flex flex-row items-start justify-start gap-[4px]">
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
  );
};

export default SettingsSharingByUser;
