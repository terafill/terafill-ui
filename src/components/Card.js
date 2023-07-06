import React, { useMemo } from 'react';

import Button from '../components/Button';

const CardItem = ({ label, label2, text, blockButton, editButton, recoveryButton }) => {
  return (
    <div className='flex flex-row justify-evenly'>
      {label && <label className='flex-1 text-lg'>{label}</label>}
      {label2 && <label className='flex-1 text-lg'>{label2}</label>}
      {text && <p className='flex-1 grow-[3] text-lg'>{text}</p>}
      {blockButton && <Button label='Block' buttonType='red' />}
      {editButton && <Button label='Edit' buttonType='link' />}
      {recoveryButton && <Button label='Recovery Kit' buttonType='link' />}
    </div>
  );
};

const Card = ({
  cardType,
  icon,
  cardLabel,
  cardLabel2,
  cardButtonVisible = false,
  cardBodyData,
}) => {
  return (
    <div
      className='self-stretch flex-1 rounded-lg px-3 py-3 flex flex-col justify-start text-left border-[0.5px] border-solid gap-2'
      id='card'
    >
      <div
        className='flex flex-row justify-start items-center h-[4rem] gap-2 border-b-[1px] border-solid'
        id='card-header'
      >
        {icon && <img className='object-contain h-full max-h-full' alt='' src={icon} />}
        <div
          className='self-stretch flex-1 flex flex-col justify-start items-start'
          id='card-header-data'
        >
          <b className='flex-1 text-2xl'>{cardLabel}</b>
          <b className='flex-1 text-lg font-medium'>{cardLabel2}</b>
        </div>
        {cardButtonVisible && <Button label='Block' buttonType='red' />}
      </div>
      <div className='flex flex-col' id='card-body'>
        {cardBodyData.map((cardItemData) => {
          if (cardType === 'device') {
            return <CardItem label={cardItemData.eventDate} text={cardItemData.eventDescription} />;
          } else if (cardType === 'password') {
            return (
              <CardItem
                label={cardItemData.userName}
                label2={cardItemData.userEmail}
                blockButton={true}
              />
            );
          } else if (cardType === 'user') {
            return (
              <CardItem
                label={cardItemData.passwordAppName}
                label2={cardItemData.passwordUserName}
                blockButton={true}
              />
            );
          } else if (cardType === 'userProfile') {
            return (
              <CardItem
                label={cardItemData.attributeType}
                label2={cardItemData.attributeValue}
                editButton={true}
              />
            );
          } else if (cardType === 'userSecurity') {
            return (
              <CardItem
                id={cardItemData.attributeType}
                label={cardItemData.attributeType}
                editButton={true}
                recoveryButton={true}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Card;
