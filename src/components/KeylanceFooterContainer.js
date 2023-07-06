import React from 'react';


import { BsTwitter, BsFacebook, BsInstagram } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/Button';


const KeylanceFooterContainer = () => {
  const navigate = useNavigate();
  return (
    <div
      className='p-8 bg-gray-50 flex flex-row items-center self-stretch justify-start'
      id='footer'
    >
      <div className='pl-4 flex-1 flex flex-col gap-2'>
        <div className='flex flex-row items-center gap-3' id='keylance-logo'>
          <img className='h-[3rem]' id='keylance-icon' alt='' src='/subtract1.svg' />
          <div className='text-5xl'>Keylance</div>
        </div>
        <i className='text-6xl' id='login-faster'>
          login faster
        </i>
      </div>
      <div className='flex-1 flex flex-row justify-around' id='right-footer'>
        <div className='flex flex-col items-center' id='support-group'>
          <h6 className='text-lg font-bold' id='Support'>
            SUPPORT
          </h6>
          <Button buttonType='link' label='FAQ' onClick={() => navigate('/faq')} />
          <a href='tel:+00-000-00000'>
            <Button buttonType='link' label='00-000-00000' />
          </a>
          <a href='mailto:support@keylance.in'>
            <Button buttonType='link' label='support@keylance.in' />
          </a>
        </div>
        <div className='flex flex-col' id='contact-group'>
          <h6 className='text-lg font-bold'>CONTACT US</h6>
          <div className='flex flex-row justify-between' id='button-group'>
            <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
              <BsTwitter size={24} />
            </a>
            <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <BsFacebook size={24} />
            </a>
            <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <BsInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeylanceFooterContainer;
