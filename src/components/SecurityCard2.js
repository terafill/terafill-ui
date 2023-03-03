import SharingCardItem2 from "../components/SharingCardItem2";
import "./SecurityCard2.css";

const SecurityCard2 = () => {
  return (
    <div className="card4">
      <div className="cardheader4">
        <label className="card-label1">{`Password & Encryption Keys`}</label>
      </div>
      <div className="cardbody4">
        <SharingCardItem2 label="Master Password" />
        <SharingCardItem2 label="Encryption Key 1" />
      </div>
    </div>
  );
};

export default SecurityCard2;
