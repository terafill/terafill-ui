import React, { useState, memo } from 'react';

import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { UpdateIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import LoginErrorPage from './errors';
import { Button2 } from '../../../components/form/Button';
import { Input } from '../../../components/form/Input';
import Logo from '../../../components/ui/Logo';
import { loginUser } from '../../../data/auth';
import useUserDevice from '../../../hooks/useUserDevice';
import { storeAuthData } from '../../../utils/security';

const LoginPage = () => {
    const { showBoundary } = useErrorBoundary();
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const [userData, setUserData] = useState({ email: email || '', password: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const { isOnline } = useUserDevice();

    const attemptLogin = async (e) => {
        try {
            toast.remove();
            e.preventDefault();
            if (!isOnline) {
                toast.error('Your device is offline', {
                    icon: <ExclamationTriangleIcon height={'30px'} width={'30px'} color='yellow' />,
                });
                return;
            }
            setLoading(true);
            const { data, error, subCode } = await loginUser(userData.email, userData.password);
            setLoading(false);
            if (error) {
                if (subCode === 0 || subCode === 1) {
                    showBoundary(error);
                } else {
                    setLoading(false);
                    toast.error(error);
                }
            } else {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                storeAuthData(userData.email, userData.password, data.keyWrappingKey);
                navigate('/app/home');
            }
        } catch (error) {
            setLoading(false);
            console.log('Unexpected error: ', error);
            // throw error;
            showBoundary(undefined);
        }
    };

    return (
        <ErrorBoundary FallbackComponent={LoginErrorPage}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className='flex h-screen w-screen flex-col items-center justify-center'
                id=''
            >
                <form
                    className='flex w-1/2 flex-col items-center justify-center gap-[32px] overflow-hidden px-16 py-16'
                    onSubmit={attemptLogin}
                >
                    <Toaster
                        position='top-center'
                        reverseOrder={false}
                        toastOptions={{
                            duration: 5000,
                            style: {
                                background: '#000000',
                                color: '#fff',
                                border: '1px solid #1F2937',
                            },
                        }}
                    />{' '}
                    <Logo variant='mini' className='h-16 w-16' />
                    <h4 className='text-center text-3xl font-semibold'>Log in to Terafill</h4>
                    <div className='w-2/3'>
                        <Input
                            type='email'
                            name='email'
                            id='email'
                            data-test='email'
                            className='w-full'
                            placeholder='Enter your email addres'
                            onChange={(e) => {
                                setUserData((prevState) => ({
                                    ...prevState,
                                    email: e.target.value,
                                }));
                            }}
                            value={userData.email}
                            required
                        />
                    </div>
                    <div className='w-2/3'>
                        <Input
                            type='password'
                            name='password'
                            id='password'
                            data-test='password'
                            className='w-full'
                            placeholder='Enter master password'
                            onChange={(e) => {
                                setUserData((prevState) => ({
                                    ...prevState,
                                    password: e.target.value,
                                }));
                            }}
                            value={userData.password}
                            required
                        />
                    </div>
                    {loading ? (
                        <Button2 disabled>
                            <UpdateIcon className='mr-2 h-4 w-4 animate-spin' />
                            Loggin in
                        </Button2>
                    ) : success ? (
                        <Button2 variant='default' className='font-semibold text-green-800'>
                            <CheckCircledIcon className='mr-2 h-6 w-6 text-green-800' />
                            Success
                        </Button2>
                    ) : (
                        <Button2 variant='default' type='submit' data-test='submit'>
                            Continue
                        </Button2>
                    )}
                </form>
            </motion.div>
        </ErrorBoundary>
    );
};

export default memo(LoginPage);
