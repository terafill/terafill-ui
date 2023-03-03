import SecurityCardItem from "../components/SecurityCardItem";
import "./ProfileCard.css";

const ProfileCard = ({ cardLabel }) => {
  return (
    <div className="card5">
      <label className="cardheader5">
        <b className="card-label2">{cardLabel}</b>
      </label>
      <div className="cardbody5">
        <SecurityCardItem
          label="Name"
          ametMinimMollitNonDeserun="Lionardo Da Vinci"
        />
        <SecurityCardItem
          label="Birthday"
          ametMinimMollitNonDeserun="15 April 1452"
        />
        <SecurityCardItem label="Gender" ametMinimMollitNonDeserun="Male" />
      </div>
    </div>
  );
};

export default ProfileCard;
