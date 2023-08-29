import { useState, useRef, useEffect } from 'react';

import { Input } from '../../../components/form/Input';

const PinInput = ({ pinState, setPinState }) => {
    const pinInputRefs = [
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
        useRef<HTMLInputElement | null>(null),
    ];

    const [pinIdx, setPinIdx] = useState(0);

    useEffect(() => {
        pinInputRefs[pinIdx].current?.focus();
    }, [pinIdx]);

    const handleFocus = (e, index) => {
        if (pinIdx != index) {
            setPinIdx(index);
        } else {
            // Do nothing
        }
    };

    const handleKeyDown = (e) => {
        const { key } = e;
        const tempPin = [...pinState];
        if (e.keyCode === 37 || e.keyCode === 8) {
            if (e.keyCode === 8) {
                tempPin[pinIdx] = '';
                setPinState(tempPin);
            }
            setPinIdx((pinIdx) => Math.max(0, pinIdx - 1));
        } else if (e.keyCode === 39) {
            setPinIdx((pinIdx) => Math.min(pinIdx + 1, pinInputRefs.length - 1));
        } else if (e.keyCode >= 48 && e.keyCode <= 57) {
            tempPin[pinIdx] = key[0];
            setPinState(tempPin);
            setPinIdx((pinIdx) => Math.min(pinIdx + 1, pinInputRefs.length - 1));
        }
    };

    const handleOnPaste = (e) => {
        const text = e.clipboardData.getData('Text');
        let textIdx = 0;
        let curPinIdx = pinIdx;
        const tempPin = [...pinState];
        while (textIdx < text.length && curPinIdx < pinInputRefs.length) {
            const char = text[textIdx];
            if (char >= '0' && char <= '9') {
                tempPin[curPinIdx] = char;
                textIdx += 1;
                curPinIdx += 1;
            } else {
                textIdx += 1;
            }
        }
        setPinState(tempPin);

        if (curPinIdx != pinIdx) {
            setPinIdx(Math.min(curPinIdx, pinInputRefs.length - 1));
        }
    };

    return (
        <>
            {pinInputRefs.map((_, index) => (
                <Input
                    key={index}
                    type='number'
                    ref={pinInputRefs[index]}
                    name={`pin-${index}`}
                    id={`pin-${index}`}
                    value={pinState[index]}
                    maxLength={1}
                    className='no-scrollbar m-0 h-16 w-16 overflow-hidden p-0 text-center text-3xl'
                    placeholder='-'
                    onKeyDown={handleKeyDown}
                    // onChange={(e)=>{console.log(`Change ${e.target.value}, id: ${event.target.id}`);}}
                    onFocus={(e) => handleFocus(e, index)}
                    onPaste={handleOnPaste}
                    required
                />
            ))}
        </>
    );
};

export default PinInput;
