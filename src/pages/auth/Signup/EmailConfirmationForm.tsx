import React, { useState } from 'react';

import { UpdateIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import PinInput from './PinInput';
import Button, { Button2 } from '../../../components/form/Button';
import { initateSignupProcess, completeSignupProcess } from '../../../data/auth';
import { storeAuthData } from '../../../utils/security';

const EmailConfirmationForm = () => {
    // eslint-disable-next-line
    const [userData, setUserData]: any = useOutletContext();
    const navigate = useNavigate();

    const [pinState, setPinState] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const signupConfirmationAction = async (e) => {
        try {
            setLoading(true);
            // e.preventDefault();
            const verificationCode = [...pinState].join('');

            const { error } = await completeSignupProcess(
                userData.email,
                userData.password,
                verificationCode,
                userData.firstName,
                userData.lastName,
            );
            if (error) {
                toast.error(error);
                setLoading(false);
            } else {
                setLoading(false);
                setSuccess(true);
                storeAuthData(userData.email);
                toast.success('Signup successful');
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (error) {
            console.error('Error occured: ', error);
        }
    };

    return (
        <form
            className='flex flex-col items-center justify-center gap-[32px] overflow-hidden px-32 py-8'
            // onSubmit={signupConfirmationAction}
        >
            <ToastContainer style={{ zIndex: 9999 }} />
            <h4 className='text-center text-3xl font-semibold'>Verify your email address</h4>
            <p className='flex shrink-0 items-center text-center text-lg text-muted-foreground'>
                <span className='w-full'>
                    <span>Enter verification code sent to email address</span>
                    <b className='text-foreground'> {userData.email}</b>
                </span>
            </p>
            <div className='flex w-full flex-row justify-evenly gap-2'>
                <PinInput pinState={pinState} setPinState={setPinState}/>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Button
                    buttonType='dark'
                    labelClassName='text-gray-300'
                    label='Re-send verification code'
                    onClick={async () => {
                        setPinState(['', '', '', '', '', '']);
                        const { error } = await initateSignupProcess(userData.email);
                        if (error) {
                            toast.error(error);
                        } else {
                            toast.success('Verification code sent successfully!');
                        }
                    }}
                    type='reset'
                />
                <Button
                    buttonType='dark'
                    label='Change email address'
                    labelClassName='text-gray-300'
                    onClick={() => {
                        navigate('/signup');
                    }}
                />
            </div>
            {loading ? (
                <Button2 disabled>
                    <UpdateIcon className='mr-2 h-4 w-4 animate-spin' />
                    Signing up
                </Button2>
            ) : success ? (
                <Button2 variant='default' className='font-semibold text-green-800'>
                    <CheckCircledIcon className='mr-2 h-6 w-6 text-green-800' />
                    Success
                </Button2>
            ) : (
                <Button2
                    variant='default'
                    type='submit'
                    data-test='submit'
                    onClick={signupConfirmationAction}
                >
                    Continue
                </Button2>
            )}
        </form>
    );
};

export default EmailConfirmationForm;
