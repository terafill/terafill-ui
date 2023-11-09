import React, { useRef } from 'react';

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Button2 } from 'components/form/Button';
import { Input } from 'components/form/Input';
import Footer from 'components/layout/Footer';
import Navbar from 'components/layout/Navbar';
import Logo from 'components/ui/Logo';
import WarningAlert from "components/ui/WarningAlert";

import AnimatedText from './AnimatedText';

const LandingPage = () => {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const emailRefSecondary = useRef<HTMLInputElement>(null);

    return (
        <>
            <WarningAlert />
            <Navbar navbarType='landing' />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='flex h-screen w-full flex-col'
                id=''
            >
                <div
                    className='flex h-screen shrink-0 flex-col items-center justify-center gap-16'
                    id='section-1'
                >
                    <div
                        className='mx-64 -mt-24 flex flex-col gap-4 text-center'
                        id='content-frame'
                    >
                        <p className='text-6xl text-white'>
                            A fast and versatile password
                            <span>
                                {' '}
                                manager for <AnimatedText />
                            </span>
                        </p>
                        <p className='text-lg text-gray-400'>
                            Terafill Password Manager can help you store all your passwords
                            effortlessly. Enjoy a fast and secure login experience with Terafill
                            Password Manager.
                        </p>
                    </div>
                    <div className='flex w-[500px] justify-center gap-4' id='action-frame'>
                        <Input ref={emailRef} type='email' placeholder='Email address' />
                        <Button2
                            variant='default'
                            onClick={() =>
                                navigate(`/signup?email=${emailRef?.current?.value ?? ''}`)
                            }
                        >
                            Get started
                        </Button2>
                    </div>
                </div>
                <div
                    className='flex h-screen shrink-0 flex-row items-center justify-center'
                    id='section-2'
                >
                    <div
                        className='flex flex-1 flex-col items-center justify-center gap-[32px] px-[80px]'
                        id='content-frame'
                    >
                        <p className='text-center text-5xl text-white'>Terafill is blazing fast</p>
                        <p className='text-center text-lg text-gray-400'>
                            Terafill is built and optimized for faster interactions with response
                            times under 50 milliseconds.{' '}
                        </p>
                    </div>
                    <div className='flex flex-1 object-contain px-[80px]'>
                        <img src='/images/undraw_fast_gray.svg' />
                    </div>
                </div>
                <div
                    className='flex h-screen shrink-0 flex-row items-center justify-center'
                    id='section-3'
                >
                    <div
                        className='flex flex-1 flex-col items-center justify-center gap-[32px] px-[80px]'
                        id='content-frame'
                    >
                        <p className='text-center text-5xl text-white'>
                            Terafill is built for keyboards lovers
                        </p>
                        <p className='text-center text-lg text-gray-400'>
                            Terafill comes with a bundle of customizable keyboard shortcuts which
                            makes overall user experience seamless.{' '}
                        </p>
                    </div>
                    <div className='flex flex-1 object-contain px-[80px]'>
                        <img src='/images/keyboard_base.png' />
                    </div>
                </div>
                <div
                    className='flex h-screen shrink-0 flex-row items-center justify-center'
                    id='section-4'
                >
                    <div
                        className='flex flex-1 flex-col items-center justify-center gap-[32px] px-[80px]'
                        id='content-frame'
                    >
                        <p className='text-center text-5xl text-white'>
                            Terafill uses zero trust security model
                        </p>
                        <p className='text-center text-lg text-gray-400'>
                            This means login password for your Terafill account is neither sent nor
                            stored to our servers. Terafill uses state of art authentication
                            protocol to login without needing to send password to our servers.{' '}
                        </p>
                    </div>
                    <div className='flex flex-1 object-contain px-[80px]'>
                        <img src='/images/undraw_security_gray.svg' />
                    </div>
                </div>
                <div
                    className='flex h-screen shrink-0 flex-col items-center justify-center gap-16'
                    id='section-5'
                >
                    <div
                        className='mx-64 flex flex-col items-center gap-4 text-center'
                        id='content-frame'
                    >
                        <Logo variant='mini' />
                        <p className='text-5xl text-white'>
                            Ready to experience the next generation password manger ?
                        </p>
                    </div>
                    <div className='flex w-[500px] justify-center gap-4' id='action-frame'>
                        <Input ref={emailRefSecondary} type='email' placeholder='Email address' />
                        <Button2
                            variant='default'
                            onClick={() =>
                                navigate(`/signup?email=${emailRefSecondary?.current?.value ?? ''}`)
                            }
                        >
                            Get started
                        </Button2>
                    </div>
                </div>
                <Footer />
            </motion.div>
        </>
    );
};

export default LandingPage;
