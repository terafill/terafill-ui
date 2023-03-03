import { useMemo } from "react";
import Button from "../components/Button";
import "./SharingCardItem.css";

const SharingCardItem = ({
  label,
  ametMinimMollitNonDeserun,
  ametMinimMollitNonDeserunMargin,
  ametMinimMollitNonDeserunFontWeight,
  labelCursor,
  labelFontWeight,
}) => {
  const ametMinimMollitStyle = useMemo(() => {
    return {
      margin: ametMinimMollitNonDeserunMargin,
      fontWeight: ametMinimMollitNonDeserunFontWeight,
    };
  }, [ametMinimMollitNonDeserunMargin, ametMinimMollitNonDeserunFontWeight]);

  const label3Style = useMemo(() => {
    return {
      cursor: labelCursor,
      fontWeight: labelFontWeight,
    };
  }, [labelCursor, labelFontWeight]);

  return (
    <div className="carditem1">
      <label className="label36" style={label3Style}>
        {label}
      </label>
      <p className="amet-minim-mollit1" style={ametMinimMollitStyle}>
        {ametMinimMollitNonDeserun}
      </p>
      <Button
        label="Block"
        buttonDerivativeBaseOverflow="unset"
        buttonRootBackgroundColor="#ff0000"
        iconXSmall="../iconxsmall@2x.png"
      />
    </div>
  );
};

export default SharingCardItem;
