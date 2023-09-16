import { useNavigate } from 'react-router-dom';

import { Button2 } from 'components/form/Button';
import Navbar from 'components/layout/Navbar';

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <div className='h-screen w-screen justify-center overflow-hidden'>
            <Navbar />
            <div className='flex h-screen flex-row items-center justify-center gap-64'>
                <img className='w-[320px] opacity-70' src='/images/undraw_lost_re_xqjt.svg' />
                <div className='flex flex-col items-center gap-8'>
                    <p className='text-3xl text-gray-300'>Page not found</p>
                    <Button2 variant={'secondary'} onClick={() => navigate('/')}>
                        Go to homepage
                    </Button2>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
