import { useEffect, useState } from 'react';

import hash from 'object-hash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getProfile, updateProfile, getProfileImage } from '../../data/user';
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import SideNavbar from '../../components/SideNavbar';
import SettingsPanel from '../../components/SettingsPanel';
import Card from '../../components/Card';

const SettingsPersonalInfo = () => {
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [userProfile, setUserProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
    birthday: '',
    gender: '',
    profileImage: '',
  });
  const [userProfileView, setUserProfileView] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
    birthday: '',
    profileImage: '',
  });

  const loadProfile = () => {
    getProfile()
      .then((response) => {
        console.log(response);
        setUserProfile((prevState) => ({
          ...prevState,
          email: response.email,
          firstName: response.first_name ? response.first_name : '',
          lastName: response.last_name ? response.last_name : '',
          phoneNo: response.phone_no ? response.phone_no : '',
          birthday: response.birthday ? response.birthday : '',
          gender: response.gender ? response.gender : '',
        }));
      })
      .catch((error) => {
        console.log(error);
      });

    getProfileImage()
      .then((response) => {
        console.log(response);
        // const base64Image = `data:image/jpeg;base64,${response.data.imageData}`;
        setUserProfile((prevState) => ({
          ...prevState,
          profileImage: response.profile_image
            ? `data:image/jpeg;base64,${response.profile_image}`
            : '',
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    setUserProfileView((prevState) => ({ ...userProfile }));
  }, [userProfile]);

  useEffect(() => {
    (async () => {
      if (hash(userProfile) != hash(userProfileView)) {
        setSaveButtonEnabled(true);
      } else {
        setSaveButtonEnabled(false);
      }
    })();
  }, [userProfileView]);

  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Create a preview of the image
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserProfileView((prevState) => ({
          ...prevState,
          profileImage: reader.result,
        }));
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className='h-screen w-full flex flex-col justify-start items-stretch text-left'>
      <Navbar navbarType='app' />
      <div className='h-full w-full flex flex-row items-stretch' id='app-screen'>
        <SideNavbar />
        <div className='flex flex-1 items-center justify-center' id='page-content-outer'>
          <ToastContainer />
          <div
            className='h-5/6 w-2/3 flex flex-0 flex-col justify-center items-center border-2 rounded-lg bg-gray-50'
            id='page-content-inner'
          >
            <div
              className='flex flex-1 flex-col items-center justify-center gap-2'
              id='profile-picture-section'
            >
              {userProfileView.profileImage ? (
                <img
                  className='relative w-32 h-32 shrink-0 overflow-hidden border-2 rounded-lg bg-white'
                  alt=''
                  src={userProfileView.profileImage}
                />
              ) : (
                <div className='flex w-32 h-32 justify-center items-center overflow-hidden border-2 rounded-lg bg-white'>
                  <Avatar email={userProfileView.email} />
                </div>
              )}
              <Button label='Update Photo' buttonType='light' labelClassName='text-gray-700'>
                <input
                  type='file'
                  onChange={onFileChange}
                  className='cursor-pointer absolute opacity-0'
                />
              </Button>
              {/*<Button label="Remove Photo" buttonType="light" labelClassName="text-red-500"/>*/}
            </div>
            <div
              className='flex flex-1 flex-col justify-center items-stretch gap-10'
              id='profile-data-section'
            >
              <span className='relative w-full flex flex-row justify-center gap-2' id='name'>
                <div className='relative w-full' id='first-name'>
                  <label
                    htmlFor='firstName'
                    className='absolute rounded -top-5 left-0 inline-block bg-gray-50 px-1 text-sm font-medium text-gray-700'
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
                    placeholder='Jane'
                    onChange={(e) => {
                      setUserProfileView((prevState) => ({
                        ...prevState,
                        firstName: e.target.value,
                      }));
                    }}
                    value={userProfileView.firstName}
                    required
                    title='Please enter first name'
                  />
                </div>

                <div className='relative w-full' id='last-name'>
                  <label
                    htmlFor='lastName'
                    className='absolute rounded -top-5 left-0 inline-block bg-gray-50 px-1 text-sm font-medium text-gray-700'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
                    placeholder='Smith'
                    value={userProfileView.lastName}
                    onChange={(e) => {
                      setUserProfileView((prevState) => ({
                        ...prevState,
                        lastName: e.target.value,
                      }));
                    }}
                  />
                </div>
              </span>

              <div className='relative flex'>
                <label
                  htmlFor='email'
                  className='absolute rounded -top-5 left-0 inline-block bg-gray-50 px-1 text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
                  placeholder='jane@example.com'
                  value={userProfileView.email}
                  onChange={(e) => {
                    setUserProfileView((prevState) => ({ ...prevState, email: e.target.value }));
                  }}
                  disabled
                  title='Please enter email'
                />
              </div>
              <div className='relative flex'>
                <label
                  htmlFor='email'
                  className='absolute rounded -top-5 left-0 inline-block bg-gray-50 px-1 text-sm font-medium text-gray-700'
                >
                  Phone No.
                </label>
                <input
                  type='tel'
                  name='phone_no'
                  id='phone_no'
                  className='w-full rounded-md px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-100 sm:text-sm sm:leading-6'
                  placeholder='00-000-00000'
                  value={userProfileView.phoneNo}
                  onChange={(e) => {
                    setUserProfileView((prevState) => ({ ...prevState, phoneNo: e.target.value }));
                  }}
                  title='Please enter phone no.'
                />
              </div>
              <div
                className='flex flex-1 flex-row justify-center items-center gap-4'
                id='form-button-group'
              >
                <Button
                  label='Discard changes'
                  buttonType='light'
                  labelClassName='text-gray-700'
                  onClick={() => {
                    loadProfile();
                  }}
                />
                <Button
                  label='Save changes'
                  buttonType='dark'
                  buttonClassName={!saveButtonEnabled ? 'pointer-events-none bg-gray-500' : ''}
                  onClick={async () => {
                    updateProfile(
                      userProfileView.firstName,
                      userProfileView.lastName,
                      userProfileView.phoneNo,
                      file,
                    )
                      .then((response) => {
                        if (response.status == 204) {
                          loadProfile();
                          toast.success('Profile updated successfully!');
                        } else {
                          console.error(response);
                          toast.error('Something went wrong!');
                        }
                      })
                      .catch((error) => {
                        console.error(error);
                        toast.error('Something went wrong!');
                      });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPersonalInfo;
