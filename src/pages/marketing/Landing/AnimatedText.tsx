import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

const AnimatedText = () => {
    const [textState, setTextState] = useState({
        text: 'Developers',
        className: '',
        key: 0, // Add a key to distinguish different states
    });

    const gradientStyles = {
        '': {}, // default
        'green-cyan': {
            background: 'linear-gradient(to right, green, cyan)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.025em',
        },
        'blue-purple': {
            background: 'linear-gradient(to right, blue, purple)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.08em',
        },
        'white-black': {
            background: 'linear-gradient(to bottom, white, black)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.08em',
        },
    };

    useEffect(() => {
        let counter = 0;

        const interval = setInterval(() => {
            counter = (counter + 1) % 4;

            switch (counter) {
                case 1:
                    setTextState({
                        text: 'Engineers',
                        className: 'green-cyan',
                        key: counter,
                    });
                    break;
                case 2:
                    setTextState({
                        text: 'Leaders',
                        className: 'blue-purple',
                        key: counter,
                    });
                    break;
                case 3:
                    setTextState({
                        text: 'Artists',
                        className: 'white-black',
                        key: counter,
                    });
                    break;
                default:
                    setTextState({
                        text: 'Developers',
                        className: '',
                        key: counter,
                    });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode='wait'>
            <motion.span
                key={textState.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
                className='gradient-text z-0'
                style={gradientStyles[textState.className]}
                id='animatedText'
            >
                {textState.text}
            </motion.span>
        </AnimatePresence>
    );
};

export default AnimatedText;