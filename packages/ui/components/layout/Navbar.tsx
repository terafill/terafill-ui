import React, { memo, useState, useRef, useCallback } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button2 } from '../form/Button';
import NotificationsMenu from '../modals/NotificationsMenu';
import PortalPopup from '../modals/PortalPopup';
import ProfileMenu from '../modals/ProfileMenu';

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
                className='sticky top-0 z-20 flex w-screen flex-row items-center justify-between bg-foreground opacity-90 dark:bg-background'
                id='navbar'
            >
                <div className='flex flex-row items-center gap-[24px]' id='left-navbar'>
                    <Link
                        to='/'
                        className='font-inter flex items-center justify-center pl-8 text-[38.4px] font-semibold not-italic leading-normal tracking-[3.84px] text-white'
                    >
                        terafill
                    </Link>
                    {navbarType === 'landing' ||
                    navbarType === 'signup' ||
                    navbarType === 'login' ? (
                        <div
                            className='flex flex-row items-center justify-center gap-[16px] lg:box-border lg:items-center lg:justify-start lg:pl-[7%]'
                            id='ButtonGroup'
                        >
                            {/* <Button buttonType='dark' label='Products' onClick={() => navigate('/products')} /> */}
                            {/* <Button buttonType='dark' label='Pricing' onClick={() => navigate('/pricing')} /> */}
                            {/* <Button
                buttonType='dark'
                label='Whitepaper'
                onClick={() => navigate('/whitepaper')}
              /> */}
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
                            <Button2
                                variant='ghost'
                                className=''
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button2>
                            // <Button
                            //     buttonType='dark'
                            //     label='Login'
                            //     onClick={() => navigate('/login')}
                            // />
                        )}
                        {navbarType === 'signup' ? (
                            ''
                        ) : (
                            <Button2 variant='default' onClick={() => navigate('/signup')}>
                                Sign Up
                            </Button2>
                            // <Button
                            //     buttonType='light'
                            //     label='Sign Up'
                            //     onClick={() => navigate('/signup')}
                            // />
                        )}
                    </div>
                ) : (
                    ''
                )}
                {navbarType === 'app' ? (
                    <div className='box-border flex flex-row items-center justify-center gap-[8px] border-l-[0.8px] px-4'>
                        {/* <button
                            className='bg-gray flex cursor-pointer flex-row items-center justify-start gap-[8px] rounded-xl px-2 py-2 shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] [border:none] hover:bg-gray-800'
                            ref={notificationsMenuButtonRef}
                            onClick={openNotificationsPopup}
                        >
                            <img className='relative h-6 w-6 shrink-0' alt='' src='/bell.svg' />
                        </button> */}
                        <button
                            className='bg-gray flex cursor-pointer flex-row items-center justify-start gap-[8px] rounded-xl px-2 py-2 shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] [border:none] hover:bg-gray-800'
                            ref={profileMenuButtonRef}
                            onClick={openProfilePopup}
                        >
                            <img
                                className='relative h-6 w-6 shrink-0'
                                alt=''
                                src='/icons/profile.svg'
                            />
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
