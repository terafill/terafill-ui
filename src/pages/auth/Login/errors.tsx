// import { useNavigate } from 'react-router-dom';

import { Button2 } from '../../../components/form/Button';
import Navbar from '../../../components/layout/Navbar';

const LoginErrorPage = () => {
    // const navigate = useNavigate();
    return (
        <div className='h-screen w-screen justify-center overflow-hidden'>
            {/* <Navbar /> */}
            <div className='flex h-screen flex-row items-center justify-center gap-64'>
                <img className='w-[320px] opacity-70' src='/images/undraw_server_down_s-4-lk.svg' />
                <div className='flex flex-col items-center gap-8'>
                    <div className='text-2xl text-gray-300'>
                        <p>Something went wrong.</p>
                        <p>Please try again later.</p>
                    </div>
                    <Button2 variant={'secondary'} onClick={() => window.location.reload()}>
                        Retry
                    </Button2>
                </div>
            </div>
        </div>
    );
};

export default LoginErrorPage;
