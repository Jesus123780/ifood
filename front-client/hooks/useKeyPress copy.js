import { useState, useEffect } from 'react';

export default function useKeyPress(targetKey) {
    // State for keeping track of whether key is pressed
    const [keyPressed, setKeyPressed] = useState(false);

    // If pressed key is our target key then set to true
    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    // Add event listeners
    useEffect(() => {
        // window.addEventListener('keydown', downHandler);
        // window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return keyPressed;
}
export const App = () => {
    // Call our hook for each key that we'd like to monitor
    const happyPress = useKeyPress('h');
    const sadPress = useKeyPress('s');
    const robotPress = useKeyPress('r');
    const foxPress = useKeyPress('f');

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <Label value="h" isBold={happyPress} />
            <Label value="s" isBold={sadPress} />
            <Label value="r" isBold={robotPress} />
            <Label value="f" isBold={foxPress} />

            <div
                style={{
                    fontSize: '200px',
                    width: '100%',
                    minHeight: '240px',
                    backgroundColor: '#e6f5f8'
                }}
            >
                {happyPress && '😊'}
                {sadPress && '😢'}
                {robotPress && '🤖'}
                {foxPress && '🦊'}
            </div>
        </div>
    );
}

const Label = ({ value, isBold }) => (
    <div
        style={{
            display: 'inline-block',
            margin: '15px',
            fontSize: '42px',
            fontWeight: isBold ? 'bold' : 'normal'
        }}
    >
        {value}
    </div>
);