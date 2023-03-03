import { useMemo } from "react";
import "./InputBox.css";

const InputBox = ({
  inputBoxBoxSizing,
  inputBoxAlignSelf,
  label,
  labelWidth,
  labelAlignSelf,
  inputBoxInnerPlaceholder,
  inputBoxInnerWidth,
  inputBoxInnerAlignSelf,
}) => {
  const inputBoxStyle = useMemo(() => {
    return {
      boxSizing: inputBoxBoxSizing,
      alignSelf: inputBoxAlignSelf,
    };
  }, [inputBoxBoxSizing, inputBoxAlignSelf]);

  const label2Style = useMemo(() => {
    return {
      width: labelWidth,
      alignSelf: labelAlignSelf,
    };
  }, [labelWidth, labelAlignSelf]);

  const inputBoxInnerStyle = useMemo(() => {
    return {
      width: inputBoxInnerWidth,
      alignSelf: inputBoxInnerAlignSelf,
    };
  }, [inputBoxInnerWidth, inputBoxInnerAlignSelf]);

  return (
    <div className="inputbox6" style={inputBoxStyle}>
      <label className="label33" style={label2Style}>
        {label}
      </label>
      <input
        className="inputboxinner2"
        type="number"
        placeholder={inputBoxInnerPlaceholder}
        required
        style={inputBoxInnerStyle}
      />
    </div>
  );
};

export default InputBox;
