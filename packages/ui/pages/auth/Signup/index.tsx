import { useState } from 'react';

import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const SignUpPage = () => {
    interface User {
        email?: string;
        firstName?: string;
        lastName?: string;
        phoneNo?: string;
        birthday?: string;
        gender?: string;
        profileImage?: string | null;
        password?: string;
    }

    // Get the current URL
    const currentURL = new URL(window.location.href);

    const [userData, setUserData] = useState<User>({
        email: currentURL.searchParams.get('email') ?? '',
        firstName: '',
        lastName: '',
        password: '',
    });

    return (
        <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.5 }}
            className='flex h-screen w-screen flex-col items-center justify-center'
            id=''
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
            />
            <div className='flex flex-1 flex-col items-center justify-center self-stretch overflow-hidden'>
                <Outlet context={[userData, setUserData]} />
            </div>
        </motion.div>
    );
};

export default SignUpPage;
