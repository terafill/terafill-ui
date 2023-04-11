import Navbar from "../components/Navbar";
import KeylanceFooterContainer from "../components/KeylanceFooterContainer";
import Button  from '../components/Button';

const LandingPage = () => {
  return (
    <div className="relative w-screen h-screen overflow-y-auto flex flex-col items-center justify-start text-center">
      <div className="w-full h-screen" id="intro-section-wrapper">
        <Navbar navbarType="landing"/>
        <div className="self-stretch shrink-0 overflow-hidden flex flex-row items-center justify-center text-left">
          <div className="self-stretch flex-1 flex flex-col px-8 items-center justify-center gap-[24px]">
            <div className="self-stretch flex flex-col items-center justify-center gap-[24px]">
              <h4 className="m-0 self-stretch relative text-[inherit] text-3xl font-bold font-inherit flex items-center shrink-0" id="heading">
                Forgot your password again?
              </h4>
              <p className="m-0 self-stretch relative text-lg font-medium text-justify flex items-center h-[118px] shrink-0" id="para">
                Keylance Password Manager can help you store all your passwords
                effortlessly. Enjoy a fast and secure login experience with
                Keylance Login Manager.
              </p>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[16px]" id="button-group">
              <Button buttonType="navbarLink" to="/signup" label="Use Keylance for free" buttonClassName="py-2 px-4"/>
              <Button buttonType="navbarLink" to="/" label="Learn more" buttonClassName="py-2 px-4 bg-white py-2 px-4 hover:bg-gray-100 ring-1 ring-black" labelClassName="text-black"/>
            </div>
          </div>
          <img
            className="self-stretch max-h-full w-2/5 shrink-0 overflow-hidden object-cover"
            alt=""
            src="../right-intro-section@2x.png"
          />
        </div>
      </div>
      <div className="self-stretch h-screen shrink-0 flex flex-col py-[131px] px-0 box-border items-start justify-start bg-[url(/public/madeinindiasection@3x.png)] bg-cover bg-no-repeat bg-[top]" id="made-in-india-section">
        <div
          className="w-[482px] h-[240px] shrink-0 flex flex-col items-center justify-between"
          id="india-infographic-container"
        >
          <b className="self-stretch relative leading-[120%] text-3xl [text-shadow:0px_0px_2px_rgba(0,_0,_0,_0.25)]">
            <span>{`Made with `}</span>
            <span className="love">love</span>
            <span> in India</span>
          </b>
          <img
            className="self-stretch relative max-w-full overflow-hidden h-[176px] shrink-0 object-cover"
            alt=""
            src="../india-flag@2x.png"
          />
        </div>
      </div>
      <div className="self-stretch h-screen shrink-0 flex flex-row py-11 px-[75px] box-border items-center justify-center gap-[32px]" id="India-map-section">
        <div className="self-stretch flex-1 flex flex-col items-center justify-center" id="data-centre-info-container">
          <b className="self-stretch relative leading-[120%] text-2xl flex items-center justify-center h-[202px] shrink-0 [backdrop-filter:blur(10px)]">
            We store data securely in data centres located in Delhi and
            Bangalore
          </b>
          <img
            className="relative w-20 h-20 shrink-0 overflow-hidden"
            alt=""
            src="../trusted-icon.svg"
          />
        </div>
        <img
          className="self-stretch flex-1 max-w-full overflow-hidden max-h-full object-cover bg-contain bg-[center]"
          alt=""
          src="../india-map-tagged@2x.png"
        />
      </div>
      <div className="self-stretch h-screen bg-gray-100 h-[720px] shrink-0 flex flex-col py-[72px] px-36 box-border items-center justify-center gap-[96px] text-[22.66px] font-source-sans-pro" id="login-faster-section">
        <div className="self-stretch h-[168px] shrink-0 flex flex-col py-2 px-0 box-border items-center justify-between" id="ButtonMesh">
          <div className="w-[992px] flex flex-row py-2 px-32 box-border items-center justify-between" id="ButtonGroup">
          <Button buttonType="dark" label="Desktop" buttonClassName="py-2 px-4"/>
          <Button buttonType="dark" label="Android" buttonClassName="py-2 px-4"/>
          <Button buttonType="dark" label="iOS" buttonClassName="py-2 px-4"/>
          </div>
          <div className="w-[992px] flex flex-row py-2 px-64 box-border items-center justify-between" id="ButtonGroup">
            <Button buttonType="dark" label="WearOS" buttonClassName="py-2 px-4"/>
            <Button buttonType="dark" label="WatchOS" buttonClassName="py-2 px-4"/>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-[25px]" id="LoginFasterInfographic">
          <img
            className="max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="../login-faster-initial-screen@2x.png"
          />
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <b className="relative flex items-center justify-center w-[115px] h-12 shrink-0">{`Fast Login!`}</b>
            <img className="relative w-[101.5px] h-[22.09px] shrink-0" alt="" src="../arrow-1.svg" />
          </div>
          <img
            className="max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="../login-faster-after-login-screen@2x.png"
          />
        </div>
      </div>
      <KeylanceFooterContainer />
    </div>
  );
};

export default LandingPage;
