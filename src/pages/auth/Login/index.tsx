import React, { useState, memo } from 'react';

import { UpdateIcon, CheckCircledIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Button2 } from '../../../components/form/Button';
import { Input } from '../../../components/form/Input';
import Logo from '../../../components/ui/Logo';
import { loginUser } from '../../../data/auth';
import { storeAuthData } from '../../../utils/security';

const LoginPage = () => {
    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const [userData, setUserData] = useState({ email: email || '', password: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const attemptLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { response, error } = await loginUser(userData.email, userData.password);
        setLoading(false);
        if (error) {
            toast.error(error);
        } else {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            storeAuthData(userData.email, userData.password, response.keyWrappingKey);
            // toast.success('Login successful');
            navigate('/app/home');
        }
    };

    return (
        <motion.div
            // key={textState.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='flex h-screen w-screen flex-col items-center justify-center'
            id=''
        >
            {/* <div className='flex h-screen w-screen flex-col items-center justify-center'> */}
            <form
                className='flex w-1/2 flex-col items-center justify-center gap-[32px] overflow-hidden px-16 py-16'
                onSubmit={attemptLogin}
            >
                <ToastContainer />
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
    );
};

export default memo(LoginPage);
