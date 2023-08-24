import React, { useState, useEffect, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Button, { Button2 } from '../../components/Button';
import Footer from '../../components/Footer';
import { Input } from '../../components/Input';
import Logo from '../../components/Logo';
import Navbar from '../../components/Navbar';

const AnimatedText = () => {
    const [textState, setTextState] = useState({
        text: 'Developers',
        className: '',
        key: 0, // Add a key to distinguish different states
    });

    const gradientStyles = {
        '': {}, // default
        'green-cyan': {
            background: 'linear-gradient(to right, green, cyan)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.025em',
        },
        'blue-purple': {
            background: 'linear-gradient(to right, blue, purple)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.08em',
        },
        'white-black': {
            background: 'linear-gradient(to bottom, white, black)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.08em',
        },
    };

    useEffect(() => {
        let counter = 0;

        const interval = setInterval(() => {
            counter = (counter + 1) % 4;

            switch (counter) {
                case 1:
                    setTextState({
                        text: 'Engineers',
                        className: 'green-cyan',
                        key: counter,
                    });
                    break;
                case 2:
                    setTextState({
                        text: 'Leaders',
                        className: 'blue-purple',
                        key: counter,
                    });
                    break;
                case 3:
                    setTextState({
                        text: 'Artists',
                        className: 'white-black',
                        key: counter,
                    });
                    break;
                default:
                    setTextState({
                        text: 'Developers',
                        className: '',
                        key: counter,
                    });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode='wait'>
            <motion.span
                key={textState.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className='gradient-text z-0'
                style={gradientStyles[textState.className]}
                id='animatedText'
            >
                {textState.text}
            </motion.span>
        </AnimatePresence>
    );
};

const LandingPage = () => {
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const emailRefSecondary = useRef(null);

    return (
        <>
            <Navbar navbarType='landing' />
            <motion.div
                // key={textState.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className='flex h-screen w-full flex-col'
                // style={gradientStyles[textState.className]}
                id=''
            >
                {/* <div className='flex h-screen w-full flex-col '> */}
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
                            onClick={() => navigate(`/signup?email=${emailRef.current.value}`)}
                        >
                            Get started
                        </Button2>
                        {/* <Button label='Get started' buttonType='light' /> */}
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
                        <img src='./undraw_fast_gray.svg' />
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
                        <img src='./KeyboardBase.png' />
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
                        <img src='undraw_security_gray.svg' />
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
                        {/* <Button label='Get started' buttonType='light' /> */}
                        <Button2
                            variant='default'
                            onClick={() =>
                                navigate(`/signup?email=${emailRefSecondary.current.value}`)
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
