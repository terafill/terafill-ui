import "./DeviceCardItem.css";

const DeviceCardItem = ({ ametMinimMollitNonDeserun }) => {
  return (
    <div className="carditem">
      <label className="label20">2020-20-20</label>
      <p className="amet-minim-mollit">{ametMinimMollitNonDeserun}</p>
    </div>
  );
};

export default DeviceCardItem;
