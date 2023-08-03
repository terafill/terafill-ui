import React from 'react';

import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import KeylanceFooterContainer from '../../components/KeylanceFooterContainer';
import Navbar from '../../components/Navbar';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className='relative flex h-screen w-screen flex-col items-center justify-start overflow-y-auto text-center'>
      <div className='h-screen w-full' id='intro-section-wrapper'>
        <Navbar navbarType='landing' />
        <div className='flex shrink-0 flex-row items-center justify-center self-stretch overflow-hidden text-left'>
          <div className='flex flex-1 flex-col items-center justify-center gap-[24px] self-stretch px-8'>
            <div className='flex flex-col items-center justify-center gap-[24px] self-stretch'>
              <h4
                className='font-inherit relative m-0 flex shrink-0 items-center self-stretch text-3xl font-bold text-[inherit]'
                id='heading'
              >
                Forgot your password again?
              </h4>
              <p
                className='relative m-0 flex h-[118px] shrink-0 items-center self-stretch text-justify text-lg font-medium'
                id='para'
              >
                Keylance Password Manager can help you store all your passwords effortlessly. Enjoy
                a fast and secure login experience with Keylance Login Manager.
              </p>
            </div>
            <div
              className='flex flex-row items-center justify-start gap-[16px] self-stretch'
              id='button-group'
            >
              <Button
                buttonType='dark'
                label='Use Keylance for free'
                buttonClassName='py-2 px-4'
                onClick={() => navigate('/signup')}
              />
              <Button
                buttonType='light'
                label='Learn more'
                buttonClassName='py-2 px-4 hover:bg-gray-100 border-[1px] border-black'
                onClick={() => navigate('/')}
              />
            </div>
          </div>
          <img
            className='max-h-full w-2/5 shrink-0 self-stretch overflow-hidden object-cover'
            alt=''
            src='../right-intro-section@2x.png'
          />
        </div>
      </div>
      <div
        className='box-border flex h-screen shrink-0 flex-col items-start justify-start self-stretch bg-[url(/public/madeinindiasection@3x.png)] bg-cover bg-[top] bg-no-repeat px-0 py-[131px]'
        id='made-in-india-section'
      >
        <div
          className='flex h-[240px] w-[482px] shrink-0 flex-col items-center justify-between'
          id='india-infographic-container'
        >
          <b className='relative self-stretch text-3xl leading-[120%] [text-shadow:0px_0px_2px_rgba(0,_0,_0,_0.25)]'>
            <span>{`Made with `}</span>
            <span className='love'>love</span>
            <span> in India</span>
          </b>
          <img
            className='relative h-[176px] max-w-full shrink-0 self-stretch overflow-hidden object-cover'
            alt=''
            src='../india-flag@2x.png'
          />
        </div>
      </div>
      <div
        className='box-border flex h-screen shrink-0 flex-row items-center justify-center gap-[32px] self-stretch px-[75px] py-11'
        id='India-map-section'
      >
        <div
          className='flex flex-1 flex-col items-center justify-center self-stretch'
          id='data-centre-info-container'
        >
          <b className='relative flex h-[202px] shrink-0 items-center justify-center self-stretch text-2xl leading-[120%] [backdrop-filter:blur(10px)]'>
            We store data securely in data centres located in Delhi and Bangalore
          </b>
          <img
            className='relative h-20 w-20 shrink-0 overflow-hidden'
            alt=''
            src='../trusted-icon.svg'
          />
        </div>
        <img
          className='max-h-full max-w-full flex-1 self-stretch overflow-hidden bg-contain bg-[center] object-cover'
          alt=''
          src='../india-map-tagged@2x.png'
        />
      </div>
      <div
        className='font-source-sans-pro box-border flex h-[720px] h-screen shrink-0 flex-col items-center justify-center gap-[96px] self-stretch bg-gray-100 px-36 py-[72px] text-[22.66px]'
        id='login-faster-section'
      >
        <div
          className='box-border flex h-[168px] shrink-0 flex-col items-center justify-between self-stretch px-0 py-2'
          id='ButtonMesh'
        >
          <div
            className='box-border flex w-[992px] flex-row items-center justify-between px-32 py-2'
            id='ButtonGroup'
          >
            <Button buttonType='dark' label='Desktop' buttonClassName='py-2 px-4' />
            <Button buttonType='dark' label='Android' buttonClassName='py-2 px-4' />
            <Button buttonType='dark' label='iOS' buttonClassName='py-2 px-4' />
          </div>
          <div
            className='box-border flex w-[992px] flex-row items-center justify-between px-64 py-2'
            id='ButtonGroup'
          >
            <Button buttonType='dark' label='WearOS' buttonClassName='py-2 px-4' />
            <Button buttonType='dark' label='WatchOS' buttonClassName='py-2 px-4' />
          </div>
        </div>
        <div
          className='flex flex-row items-center justify-center gap-[25px]'
          id='LoginFasterInfographic'
        >
          <img
            className='max-h-full max-w-full overflow-hidden object-cover'
            alt=''
            src='../login-faster-initial-screen@2x.png'
          />
          <div className='flex flex-col items-center justify-center gap-[8px]'>
            <b className='relative flex h-12 w-[115px] shrink-0 items-center justify-center'>{`Fast Login!`}</b>
            <img
              className='relative h-[22.09px] w-[101.5px] shrink-0'
              alt=''
              src='../arrow-1.svg'
            />
          </div>
          <img
            className='max-h-full max-w-full overflow-hidden object-cover'
            alt=''
            src='../login-faster-after-login-screen@2x.png'
          />
        </div>
      </div>
      <KeylanceFooterContainer />
    </div>
  );
};

export default LandingPage;
