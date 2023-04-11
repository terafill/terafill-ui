import Navbar from "../../components/Navbar";
import SettingsPanel from "../../components/SettingsPanel";
import SearchInputBox from "../../components/SearchInputBox";
import Button from "../../components/Button";
import Card from "../../components/Card";

const SettingsDeviceManagement = () => {

  const deviceDataList = [
    {
      deviceId: 1,
      deviceName: "Home McBook",
      deviceLocation: "Delhi",
      deviceIcon: "../appleDark.png",
      deviceEventList:[
        {
          eventDate: "2020-20-20",
          eventDescription: "Logged in into Keylance account"
        },
        {
          eventDate: "2020-20-20",
          eventDescription: "You created new password for twitter account twitter account"
        }
      ]
    },
    {
      deviceId: 2,
      deviceName: "Samsung Smartphone",
      deviceLocation: "Noida",
      deviceIcon: "../android.png",
      deviceEventList:[
        {
          eventDate: "2020-20-20",
          eventDescription: "Logged in into Keylance account"
        },
        {
          eventDate: "2020-20-20",
          eventDescription: "You created new password for twitter account twitter account"
        }
      ]
    }
  ]

  return (
    <div className="self-stretch flex-1 overflow-y-auto flex flex-col py-8 px-40 items-center justify-start gap-[32px] z-[0]">
      <SearchInputBox />
      <Button buttonType="dark" label="Sync new device"/>
      {deviceDataList.map( deviceData =>
        <Card
          cardType="device"
          key={deviceData.deviceId}
          icon={deviceData.deviceIcon}
          cardLabel={deviceData.deviceName}
          cardLabel2={deviceData.deviceLocation}
          cardBodyData={deviceData.deviceEventList}
          cardButtonVisible={true}
        />
      )}
    </div>
  );
};

export default SettingsDeviceManagement;
