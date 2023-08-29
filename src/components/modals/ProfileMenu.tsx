import React, { memo, useState, useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-hot-toast';

import { MenuItem } from './Menu';
import { logoutUser } from '../../data/auth';
import { cleanupUserSession } from '../../utils/tokenTools';
import PortalPopup from '../modals/PortalPopup';
import SignoutPopup from '../modals/SignoutPopup';

const ProfileMenu = () => {
    const [isSignoutPopupOpen, setSignoutPopupOpen] = useState(false);
    const navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();

    const onSignoutConfirm = useCallback(async () => {
        // Signout
        try {
            // toast.dismiss();
            const { error, subCode } = await logoutUser();
            if (error) {
                if (subCode === 0 || subCode === 1) {
                    showBoundary(error);
                } else {
                    toast.error(error);
                }
            } else {
                cleanupUserSession(null);
                console.log('Session cleaned up!');
                navigate('/');
            }
        } catch (error) {
            console.log('Unexpected error: ', error);
            // throw error;
            showBoundary(null);
        }
    }, []);

    const openSignoutPopup = useCallback(() => {
        setSignoutPopupOpen(true);
    }, []);

    const closeSignoutPopup = useCallback(() => {
        setSignoutPopupOpen(false);
    }, []);

    return (
        <>
            <div className='relative flex max-h-full max-w-full flex-col items-center justify-center overflow-hidden rounded-md border bg-black'>
                <div className='flex w-[200px] flex-col items-center justify-center gap-2 overflow-hidden px-2 py-2'>
                    <MenuItem menuItem='Home' onClick={() => navigate('/app/home')} />
                    {/*<MenuItem menuItem="Settings" onClick={()=>navigate("/settings")}/>*/}
                    {/*<MenuItem menuItem='Download App' />*/}
                    {/*<MenuItem menuItem='Import' onClick={() => navigate('/import')} />*/}
                    {/*<MenuItem menuItem={`Help & Support`} onClick={() => navigate('/help-and-support')} />*/}
                    <MenuItem menuItem='Sign Out' onClick={openSignoutPopup} />
                </div>
            </div>
            {isSignoutPopupOpen && (
                <PortalPopup
                    overlayColor='rgba(113, 113, 113, 0.3)'
                    placement='Centered'
                    onOutsideClick={closeSignoutPopup}
                >
                    <SignoutPopup onConfirm={onSignoutConfirm} onClose={closeSignoutPopup} />
                </PortalPopup>
            )}
        </>
    );
};

export default memo(ProfileMenu);
