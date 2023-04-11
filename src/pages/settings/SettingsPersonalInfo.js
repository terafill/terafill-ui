import Navbar from "../../components/Navbar";
import SettingsPanel from "../../components/SettingsPanel";
import Card from "../../components/Card";

const SettingsPersonalInfo = () => {

  const userProfile = [
  {
    profileType: "Basic Info",
    profileAttributeList: [
      {
        attributeType: "Name",
        attributeValue: "Lionardo Da Vinci"
      },
      {
        attributeType: "Birthday",
        attributeValue: "15 April 1452"
      },
      {
        attributeType: "Gender",
        attributeValue: "Male"
      }
    ]
  },
  {
    profileType: "Contact Info",
    profileAttributeList: [
      {
        attributeType: "Email",
        attributeValue: "leonardo@keylance.in"
      },
      {
        attributeType: "PhoneNo",
        attributeValue: "00-000-0000"
      },
    ]
  }]

  return (
        <div className="self-stretch flex-1 bg-font-light overflow-y-auto flex flex-col py-8 px-40 items-center justify-start gap-[32px] z-[0]">
          <div className="flex flex-col items-center justify-center">
            <img
              className="relative w-32 h-32 shrink-0 overflow-hidden"
              alt=""
              src="../iconoirprofilecircle.svg"
            />
            <b className="relative leading-[120%] flex items-center justify-center w-[444px] h-[77px] shrink-0">Welcome, Leonardo</b>
          </div>
          {userProfile.map( userProfileData =>
            <Card
              cardType="userProfile"
              key={userProfileData.profileType}
              cardLabel={userProfileData.profileType}
              cardBodyData={userProfileData.profileAttributeList}
            />
          )}
        </div>
  );
};

export default SettingsPersonalInfo;
