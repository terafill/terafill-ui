import { useMemo } from "react";
import BlockButton from "../components/BlockButton";
import DeviceCardItem from "../components/DeviceCardItem";
import "./DeviceCard.css";

const DeviceCard = ({
  cardHeight,
  cardFlexShrink,
  icon,
  appLabel,
  username,
}) => {
  const cardStyle = useMemo(() => {
    return {
      height: cardHeight,
      flexShrink: cardFlexShrink,
    };
  }, [cardHeight, cardFlexShrink]);

  return (
    <div className="card" style={cardStyle}>
      <div className="cardheader">
        <div className="cardheaderinner">
          <img className="icon1" alt="" src={icon} />
          <div className="data">
            <b className="app-label">{appLabel}</b>
            <b className="username">{username}</b>
          </div>
          <BlockButton iconXSmall="../iconxsmall13@2x.png" />
        </div>
      </div>
      <div className="cardbody">
        <DeviceCardItem ametMinimMollitNonDeserun="Logged in into Keylance account" />
        <DeviceCardItem ametMinimMollitNonDeserun="You created new password for twitter account" />
      </div>
    </div>
  );
};

export default DeviceCard;
