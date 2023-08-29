// import { useNavigate } from 'react-router-dom';

import { Button2 } from './components/form/Button';
// import Navbar from '../../../components/layout/Navbar';

const GlobalError = ({ error, resetErrorBoundary }) => {
    let errorMessage: string = "Something went wrong. Please try again.";
    if (typeof error === "string" || error instanceof String) {
        errorMessage = String(error); // Casting it to a primitive string
    }
    return (
        <div className='h-screen w-screen justify-center overflow-hidden'>
            {/* <Navbar /> */}
            <div className='flex flex-row justify-center items-center h-screen gap-64'>
                <img className='w-[320px] opacity-70' src='/images/undraw_server_down_s-4-lk.svg' />
                <div className='flex flex-col items-center gap-8'>
                    <div className='text-xl text-gray-300'>
                        {
                            errorMessage
                        }
                    </div>                        
                    <Button2 variant={'secondary'} onClick={() => resetErrorBoundary()}>Retry</Button2>
                </div>
            </div>
        </div>
    );
};

export default GlobalError;
