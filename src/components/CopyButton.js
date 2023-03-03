import "./CopyButton.css";

const CopyButton = () => {
  return (
    <button className="copybutton">
      <b className="copy">COPY</b>
      <img
        className="material-symbolsfile-copy-out-icon"
        alt=""
        src="../materialsymbolsfilecopyoutline.svg"
      />
    </button>
  );
};

export default CopyButton;
