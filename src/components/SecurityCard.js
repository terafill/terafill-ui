import SecurityCardItem from "../components/SecurityCardItem";
import "./SecurityCard.css";

const SecurityCard = () => {
  return (
    <div className="card3">
      <div className="cardheader3">
        <label className="card-label">Email</label>
      </div>
      <div className="cardbody3">
        <SecurityCardItem
          label="Primary Email"
          ametMinimMollitNonDeserun="leonardo@keylance.in"
        />
        <SecurityCardItem
          label="Recovery Email"
          ametMinimMollitNonDeserun="leo2@keylance.io"
        />
        <div className="carditem3">
          <b className="label38">Gender</b>
          <b className="amet-minim-mollit3">Male</b>
          <button className="buttonderivativebase31">
            <button className="buttonroot33">
              <img
                className="iconxsmall31"
                alt=""
                src="../iconxsmall94@2x.png"
              />
              <div className="label39">Edit</div>
            </button>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityCard;
