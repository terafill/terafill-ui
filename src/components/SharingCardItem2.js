import Button from "../components/Button";
import "./SharingCardItem2.css";

const SharingCardItem2 = ({ label }) => {
  return (
    <div className="carditem4">
      <label className="label40">{label}</label>
      <Button
        label="Change Password"
        buttonBackgroundColor="transparent"
        buttonBoxShadow="unset"
        labelColor="#3f9bf1"
        iconXSmall="../iconxsmall@2x.png"
      />
      <Button
        label="Recovery kit"
        buttonBackgroundColor="transparent"
        buttonBoxShadow="unset"
        labelColor="#3f9bf1"
        iconXSmall="../iconxsmall@2x.png"
      />
    </div>
  );
};

export default SharingCardItem2;
