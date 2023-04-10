import { useMemo } from "react";
import Button from "../components/Button";
import "./Card.css";
import "./CardItem.css";


const CardItem = ({
  label,
  label2,
  text,
  blockButton,
  editButton,
  recoveryButton,
  }) => {
  return (
    <div className="cardItem">
      {label && <label className="cardItemLabel">{label}</label>}
      {label2 &&
        <label
          className="cardItemLabel"
          style={{flex: "1 1"}}
          >{label2}
        </label>}
      {text && <p className="cardItemText">{text}</p>}
      {blockButton && <Button label="Block" buttonType="red" />}
      {editButton && <Button label="Edit" buttonType="link" />}
      {recoveryButton && <Button label="Recovery Kit" buttonType="link" />}
    </div>
  );
};

const Card = ({
  cardType,
  icon,
  cardLabel,
  cardLabel2,
  cardButtonVisible=false,
  cardBodyData,
  cardHeight,
  cardFlexShrink,
}) => {
  const cardStyle = useMemo(() => {
    return {
      height: cardHeight,
      flexShrink: cardFlexShrink,
    };
  }, [cardHeight, cardFlexShrink]);

  return (
    <div className="card" style={cardStyle}>
      <div className="cardHeader">
          {icon && <img className="cardIcon" alt="" src={icon} />}
          <div className="cardHeaderData">
            <b className="cardLabel">{cardLabel}</b>
            <b className="cardLabel2">{cardLabel2}</b>
          </div>
          {cardButtonVisible && <Button label="Block" buttonType="red" />}
      </div>
      <div className="cardBody">
        {cardBodyData.map(cardItemData=>{
          if(cardType === "device"){
            return <CardItem
              label={cardItemData.eventDate}
              text={cardItemData.eventDescription} />
          }
          else if(cardType === "password"){
            return <CardItem
              label={cardItemData.userName}
              label2={cardItemData.userEmail}
              blockButton={true}/>
          }
          else if(cardType === "user"){
            return <CardItem
              label={cardItemData.passwordAppName}
              label2={cardItemData.passwordUserName}
              blockButton={true}/>
          }
          else if(cardType === "userProfile"){
            return <CardItem
              label={cardItemData.attributeType}
              label2={cardItemData.attributeValue}
              editButton={true}/>
          }
          else if(cardType === "userSecurity"){
            return <CardItem
              id={cardItemData.attributeType}
              label={cardItemData.attributeType}
              editButton={true}
              recoveryButton={true}
              />
          }
        })}
      </div>
    </div>
  );
};

export default Card;
