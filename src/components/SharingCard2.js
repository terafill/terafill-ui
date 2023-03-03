import SharingCardItem from "../components/SharingCardItem";
import "./SharingCard2.css";

const SharingCard2 = ({ icon, appLabel, username }) => {
  return (
    <div className="card2">
      <div className="cardheader2">
        <div className="cardheaderinner2">
          <img className="icon4" alt="" src={icon} />
          <div className="data4">
            <b className="app-label4">{appLabel}</b>
            <b className="username4">{username}</b>
          </div>
        </div>
      </div>
      <div className="cardbody2">
        <SharingCardItem
          label="Ram"
          ametMinimMollitNonDeserun="ram@example.com"
        />
        <SharingCardItem
          label="Karan"
          ametMinimMollitNonDeserun="karan@example.com"
        />
      </div>
    </div>
  );
};

export default SharingCard2;
