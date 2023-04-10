import Button from "../components/Button";

const SettingsPanel = ( { activePanel } ) => {
  const extraBoxShadow = "0px 0px 4px rgba(0, 0, 0, 0.25) inset";
  return (
    <nav className="self-stretch bg-white bg-font-light shadow-[2px_4px_4px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-col py-0 px-4 items-center justify-center gap-[64px] z-[1]">
    <Button buttonType="panel" label="Personal Info" buttonClassName={`${activePanel=="Personal Info" ? 'bg-gray-100' : ''}`} />
    <Button buttonType="panel" label="Security" buttonClassName={`${activePanel=="Security" ? 'bg-gray-100' : ''}`}/>
    <Button buttonType="panel" label="Sharing" buttonClassName={`${activePanel=="Sharing" ? 'bg-gray-100' : ''}`}/>
    <Button buttonType="panel" label="Device Management" buttonClassName={`${activePanel=="Device Management" ? 'bg-gray-100' : ''}`}/>
    </nav>
  );
};

export default SettingsPanel;
