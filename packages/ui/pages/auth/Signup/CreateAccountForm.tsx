import React, { useState, useRef } from 'react';

import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { UpdateIcon } from '@radix-ui/react-icons';
import { useErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-hot-toast';
import { useNavigate, useOutletContext } from 'react-router-dom';

import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';
import Logo from 'components/ui/Logo';
import { initateSignupProcess } from 'lib/api/auth';
import useUserDevice from 'lib/hooks/useUserDevice';

const CreateAccountForm = () => {
    // eslint-disable-next-line
    const [userData, setUserData]: any = useOutletContext();
    const navigate = useNavigate();

    const passwordRef = useRef<HTMLInputElement | null>(null);
    const passwordRepeatRef = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState(false);
    // const [success, setSuccess] = useState(false);

    const { isOnline } = useUserDevice();
    const { showBoundary } = useErrorBoundary();

    const createAccountAction = async (e) => {
        try {
            toast.remove();
            e.preventDefault();
            if (!isOnline) {
                toast.error('Your device is offline', {
                    icon: <ExclamationTriangleIcon height={'30px'} width={'30px'} color='yellow' />,
                });
                return;
            } else if (
                passwordRef.current?.value &&
                passwordRef.current?.value != passwordRepeatRef.current?.value
            ) {
                toast.error("Passwords don't match!", {
                    icon: <ExclamationTriangleIcon height={'30px'} width={'30px'} color='yellow' />,
                });

                return;
            } else {
                setLoading(true);
                const { error, subCode } = await initateSignupProcess(userData.email);
                setLoading(false);
                if (error) {
                    if (subCode === 0 || subCode === 1) {
                        showBoundary(error);
                    } else {
                        setLoading(false);
                        toast.error(error);
                    }
                } else {
                    setTimeout(() => navigate('email-confirmation'), 200);
                }
            }
        } catch (error) {
            setLoading(false);
            console.log('Unexpected error: ', error);
            // throw error;
            showBoundary(undefined);
        }
    };

    return (
        <form
            className='flex flex-col items-center justify-center gap-[16px] px-32 py-8'
            onSubmit={createAccountAction}
        >
            <Logo variant='mini' className='h-16 w-16' />
            <h4 className='leading-[120% relative m-0 text-center text-3xl font-bold'>
                Create your Terafill account
            </h4>

            <span className='relative flex w-2/3 flex-auto flex-row justify-center gap-2' id='name'>
                <div className='relative w-full' id='first-name'>
                    <Input
                        type='text'
                        name='firstName'
                        id='firstName'
                        className='w-full'
                        placeholder='First Name'
                        onChange={(e) => {
                            setUserData((prevState) => ({
                                ...prevState,
                                firstName: e.target.value,
                            }));
                        }}
                        value={userData.firstName}
                        required
                    />
                </div>

                <div className='relative w-full' id='last-name'>
                    <Input
                        type='text'
                        name='lastName'
                        id='lastName'
                        className='w-full'
                        placeholder='Last Name'
                        value={userData.lastName}
                        onChange={(e) => {
                            setUserData((prevState) => ({
                                ...prevState,
                                lastName: e.target.value,
                            }));
                        }}
                    />
                </div>
            </span>

            <div className='relative w-2/3'>
                <Input
                    type='email'
                    name='email'
                    id='email'
                    className='w-full'
                    placeholder='Email address'
                    value={userData.email}
                    onChange={(e) => {
                        setUserData((prevState) => ({ ...prevState, email: e.target.value }));
                    }}
                    required
                />
            </div>
            <div className='relative w-2/3'>
                <Input
                    ref={passwordRef}
                    type='password'
                    name='password'
                    id='password'
                    className='w-full'
                    placeholder='Enter master password'
                    onChange={(e) => {
                        setUserData((prevState) => ({ ...prevState, password: e.target.value }));
                    }}
                    required
                />
            </div>
            <div className='relative w-2/3'>
                <Input
                    ref={passwordRepeatRef}
                    type='password'
                    name='passwordRepeat'
                    id='passwordRepeat'
                    className='w-full'
                    placeholder='Re-enter Master Password'
                    required
                />
            </div>
            <p className='text-destructive-foreground'>
                Note: Memorise this password and keep it safe.
            </p>
            {/* <Button id='submit-button' buttonType='light' label='Create Account' type='submit' /> */}
            {loading ? (
                <Button2 disabled>
                    <UpdateIcon className='mr-2 h-4 w-4 animate-spin' />
                    Loading
                </Button2>
            ) : (
                <Button2 variant='default' type='submit' data-test='submit'>
                    Continue
                </Button2>
            )}
        </form>
    );
};

export default CreateAccountForm;
