import React, { memo, useState, useRef, useCallback } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import NotificationsMenu from '../components/NotificationsMenu';
import PortalPopup from '../components/PortalPopup';
import ProfileMenu from '../components/ProfileMenu';

const Navbar = ({ navbarType = 'landing' }) => {
  const navigate = useNavigate();
  const profileMenuButtonRef = useRef(null);
  const [isNotificationsPopupOpen, setNotificationsPopupOpen] = useState(false);
  const notificationsMenuButtonRef = useRef(null);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);

  // const openNotificationsPopup = useCallback(() => {
  //   setNotificationsPopupOpen(true);
  // }, []);

  const closeNotificationsPopup = useCallback(() => {
    setNotificationsPopupOpen(false);
  }, []);

  const openProfilePopup = useCallback(() => {
    setProfilePopupOpen(true);
  }, []);

  const closeProfilePopup = useCallback(() => {
    setProfilePopupOpen(false);
  }, []);

  return (
    <>
      <div
        className='text-font-light font-dm-serif-display flex flex-row items-center justify-between self-stretch bg-black text-center text-[33.18px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]'
        id='navbar'
      >
        <div className='flex flex-row items-center justify-start gap-[24px]' id='left-navbar'>
          <div className='relative h-12 w-[200px] shrink-0'>
            <img className='absolute left-[8px] top-[8px] h-7 w-7' alt='' src='/subtract.svg' />
            <Link
              to='/'
              className='absolute left-[44px] top-[8px] flex h-7 w-[136px] items-center justify-center text-white'
            >
              Keylance
            </Link>
          </div>
          {navbarType === 'landing' || navbarType === 'signup' || navbarType === 'login' ? (
            <div
              className='flex flex-row items-center justify-center gap-[16px] lg:box-border lg:items-center lg:justify-start lg:pl-[7%]'
              id='ButtonGroup'
            >
              <Button buttonType='dark' label='Products' onClick={() => navigate('/products')} />
              <Button buttonType='dark' label='Pricing' onClick={() => navigate('/pricing')} />
              <Button
                buttonType='dark'
                label='Whitepaper'
                onClick={() => navigate('/whitepaper')}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        {navbarType === 'landing' || navbarType === 'signup' || navbarType === 'login' ? (
          <div className='flex flex-row items-center justify-center gap-[8px] px-4'>
            {navbarType === 'login' ? (
              ''
            ) : (
              <Button buttonType='dark' label='Login' onClick={() => navigate('/login')} />
            )}
            {navbarType === 'signup' ? (
              ''
            ) : (
              <Button buttonType='light' label='Sign Up' onClick={() => navigate('/signup')} />
            )}
          </div>
        ) : (
          ''
        )}
        {navbarType === 'app' ? (
          <div className='box-border flex flex-row items-center justify-center gap-[8px] border-l-[0.8px] px-4'>
            {/*
            <button
              className='cursor-pointer [border:none] py-2 px-2 bg-gray hover:bg-gray-800 rounded-xl shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] flex flex-row items-center justify-start gap-[8px]'
              ref={notificationsMenuButtonRef}
              onClick={openNotificationsPopup}
            >
              <img className='relative w-6 h-6 shrink-0' alt='' src='/bell.svg' />
            </button>*/}
            <button
              className='bg-gray flex cursor-pointer flex-row items-center justify-start gap-[8px] rounded-xl px-2 py-2 shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] [border:none] hover:bg-gray-800'
              ref={profileMenuButtonRef}
              onClick={openProfilePopup}
            >
              <img className='relative h-6 w-6 shrink-0' alt='' src='/profile.svg' />
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      {isNotificationsPopupOpen && (
        <PortalPopup
          // overlayColor="rgba(113, 113, 113, 0.1)"
          placement='Bottom right'
          right={8}
          bottom={16}
          relativeLayerRef={notificationsMenuButtonRef}
          onOutsideClick={closeNotificationsPopup}
        >
          <NotificationsMenu onClose={closeNotificationsPopup} />
        </PortalPopup>
      )}
      {isProfilePopupOpen && (
        <PortalPopup
          // overlayColor="rgba(113, 113, 113, 0.1)"
          placement='Bottom right'
          right={8}
          bottom={16}
          relativeLayerRef={profileMenuButtonRef}
          onOutsideClick={closeProfilePopup}
        >
          <ProfileMenu onClose={closeProfilePopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default memo(Navbar);
