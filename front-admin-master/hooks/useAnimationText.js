import React, { useEffect, useState, useRef } from 'react';

const fullText =
  ' this is full text it\'ll be animated again! Writing a really huge senetence here so that I can see the animation happen. I know it\'s fast but that\'s how it goes.';

const useAnimatedText = textMessage => {
    const fullTextRef = useRef(textMessage);
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    useEffect(() => {
        if (index < fullText.length) {
            window.requestAnimationFrame(() => {
                // eslint-disable-next-line
                setText(text => text + fullTextRef.current[index]);
                setIndex(() => index + 1);
            });
        }
    }, [index]);
    useEffect(() => {
        fullText.current = textMessage;
    }, [textMessage]);

    return text;
};

export default function TextHook() {
    const text = useAnimatedText(fullText);
    return <span>{text} </span>;
}