import { useMemo } from "react";
import Button from "../components/Button";
import "./SecurityCardItem.css";

const SecurityCardItem = ({
  label,
  ametMinimMollitNonDeserun,
  cardItemDisplay,
  ametMinimMollitNonDeserunMargin,
  ametMinimMollitNonDeserunCursor,
}) => {
  const cardItemStyle = useMemo(() => {
    return {
      display: cardItemDisplay,
    };
  }, [cardItemDisplay]);

  const ametMinimMollit1Style = useMemo(() => {
    return {
      margin: ametMinimMollitNonDeserunMargin,
      cursor: ametMinimMollitNonDeserunCursor,
    };
  }, [ametMinimMollitNonDeserunMargin, ametMinimMollitNonDeserunCursor]);

  return (
    <div className="carditem2" style={cardItemStyle}>
      <label className="label37">{label}</label>
      <p className="amet-minim-mollit2" style={ametMinimMollit1Style}>
        {ametMinimMollitNonDeserun}
      </p>
      <Button
        label="Edit"
        buttonRootBackgroundColor="transparent"
        buttonRootBoxShadow="unset"
        labelColor="#3f9bf1"
        iconXSmall="../iconxsmall@2x.png"
        buttonRootBoxSizing="unset"
        labelDisplay="unset"
      />
    </div>
  );
};

export default SecurityCardItem;
