import React, { memo } from 'react';

import Button from './Button';

const SignoutPopup = ({ onConfirm, onClose }) => {
    return (
        <div className='relative flex max-h-full max-w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-md bg-white px-8 py-8'>
            <b className='relative flex shrink-0 items-center justify-center text-lg'>
                Confirm sign out ?
            </b>
            <div className='flex flex-row items-center justify-center gap-4 self-stretch'>
                <Button onClick={onConfirm} label='Confirm' />
                <Button onClick={onClose} label='Cancel' />
            </div>
        </div>
    );
};

export default memo(SignoutPopup);
