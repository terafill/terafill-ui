import {
  useNavigate,
  useOutletContext,
} from 'react-router-dom';



export const CreateAccountForm = () => {
  return (
      {/*        <div className="relative w-2/3">
          <label htmlFor="location" className="absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="location"
            name="location"
            className="w-full bg-white rounded-md px-2 py-2.5 shadow-sm text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 appearance-none" // Add the appearance-none class
            // defaultValue="Canada"
            value={userData.country}
            onChange={ (e) =>{setUserData(prevState => ({...prevState, country: e.target.value}))} }
          >
            {
            countries.map((country) =>
              <option key={country} value={country}>
                {country}
              </option>
              )
            }
          </select>
          <div className="absolute top-0 right-0 h-full pr-3 flex items-center pointer-events-none">
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </div>
        </div>*/}

      {/*        <h6 className="m-0 relative text-xl leading-[120%] font-bold text-black text-center">
          Create your master password
        </h6>*/}
    )
}

export const RecoveryKitForm = () => {
  const [stepIdx, steps, stepForward, stepBackward, userData, setUserData] = useOutletContext();

  const navigate = useNavigate();
  return (
    <form
      className='bg-white rounded-xl shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-8 px-32 items-center justify-center gap-[32px]'
      onSubmit={() => navigate('/app-home')}
    >
      <h4 className='m-0 relative text-4xl leading-[120%] font-bold text-black text-center'>
        Download account recovery kit
      </h4>
      <div className='relative w-full flex flex-row gap-2'>
        <label
          htmlFor='name'
          className='absolute rounded -top-3 left-1 inline-block bg-white px-1 text-sm font-medium text-gray-700'
        >
          Security Key
        </label>
        <input
          type='text'
          name='skey'
          id='skey'
          value={userData.secretKey}
          className='w-full rounded-md px-2 py-2 text-lg font-medium text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100'
        />
        <Button label='COPY' buttonType='light' />
      </div>
      <p className='m-0 relative text-1xl text-red-500 font-bold text-center flex items-center w-[538px] h-[78px] shrink-0'>
        Note: Copy this secret key and keep it somewhere safe. It can help you recover your account
        in case you lose your master password.
      </p>
      <div className='flex flex-row py-4 px-0 items-start justify-start gap-[32px]'>
        <Button buttonType='dark' label='Download Kit' />
        <Button buttonType='dark' label='Finish Setup' id='submit-button' type='submit' />
      </div>
    </form>
  );
};

const steps = {
  1: { id: 'Step 1', name: 'Create Account', to: '' },
  2: { id: 'Step 2', name: 'Email Confirmation', to: 'email-confirmation' },
};



const SignUp = () => {
  const [stepStatus, setStepStatus] = useState({
    1: 'current',
    2: 'upcoming',
  });

    return(
        <nav aria-label='Progress' className='mb-4 w-2/3'>
          <ol role='list' className='space-y-4 md:flex md:space-x-16 md:space-y-0'>
            {
              // eslint-disable-next-line no-unused-vars
              Object.entries(steps).map(([idx, step]) => (
                <li key={step.name} className='md:flex-1'>
                  {stepStatus[idx] === 'completed' ? (
                    <span className='flex flex-col items-center rounded-lg border-t-4 bg-gray-200 py-2'>
                      <span className='text-sm font-medium text-black'>{step.name}</span>
                    </span>
                  ) : stepStatus[idx] === 'current' ? (
                    <span className='flex flex-col items-center items-center rounded-lg border-t-4 border-black bg-gray-200 py-2'>
                      <span className='text-sm font-medium text-black'>{step.name}</span>
                    </span>
                  ) : (
                    <span className='flex flex-col items-center rounded-lg border-t-4 border-gray-200 py-2'>
                      <span className='text-sm font-medium text-gray-500'>{step.name}</span>
                    </span>
                  )}
                </li>
              ))
            }
          </ol>
        </nav> 
    )
}