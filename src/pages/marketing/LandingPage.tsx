import React, { useState, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { Input } from '../../components/Input';
import Logo from '../../components/Logo';
import Navbar from '../../components/Navbar';

const LandingPage = () => {
    // const navigate = useNavigate();

    const [textState, setTextState] = useState({
        text: 'Developers',
        className: '',
    });

    useEffect(() => {
        let counter = 0;

        const interval = setInterval(() => {
            counter = (counter + 1) % 3;

            switch (counter) {
                case 1:
                    setTextState({
                        text: 'Engineers',
                        className: 'green-cyan',
                    });
                    break;
                case 2:
                    setTextState({
                        text: 'Leaders',
                        className: 'blue-purple',
                    });
                    break;
                default:
                    setTextState({
                        text: 'Developers',
                        className: '',
                    });
            }
        }, 3000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Navbar navbarType='landing' />
            <div className='flex h-screen w-full flex-col '>
                <div
                    className='flex h-screen shrink-0 flex-col items-center justify-center gap-16'
                    id='section-1'
                >
                    <div
                        className='mx-64 -mt-24 flex flex-col gap-4 text-center'
                        id='content-frame'
                    >
                        <p className='text-6xl text-white'>
                            A fast and versatile password manager for{' '}
                            <span
                                className={`gradient-text ${textState.className}`}
                                id='animatedText'
                            >
                                {textState.text}
                            </span>
                        </p>
                        <p className='text-lg text-gray-400'>
                            Terafill Password Manager can help you store all your passwords
                            effortlessly. Enjoy a fast and secure login experience with Terafill
                            Password Manager.
                        </p>
                    </div>
                    <div className='flex w-[500px] justify-center gap-4' id='action-frame'>
                        <Input type='email' placeholder='Email address' />
                        <Button label='Get started' buttonType='light' />
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
                        <Input type='email' placeholder='Email address' />
                        <Button label='Get started' buttonType='light' />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default LandingPage;
