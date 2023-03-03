import { useMemo } from "react";
import SharingCardItem from "../components/SharingCardItem";
import "./SharingCard.css";

const SharingCard = ({ cardOverflow, appLabel, username }) => {
  const card1Style = useMemo(() => {
    return {
      overflow: cardOverflow,
    };
  }, [cardOverflow]);

  return (
    <div className="card1" style={card1Style}>
      <div className="cardheader1">
        <div className="cardheaderinner1">
          <div className="data3">
            <b className="app-label3">{appLabel}</b>
            <b className="username3">{username}</b>
          </div>
        </div>
      </div>
      <div className="cardbody1">
        <SharingCardItem
          label="Netflix"
          ametMinimMollitNonDeserun="leonardo@keylance.in"
        />
        <SharingCardItem label="Facebook" ametMinimMollitNonDeserun="leo42" />
      </div>
    </div>
  );
};

export default SharingCard;
