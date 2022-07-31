import React, { useState } from 'react';

export const Range = ({ min = 0, max = 100, value = 0, label }) => {
    const [currentValue, setCurrentValue] = useState(value);
    const inputWidth = 600;
    const width = inputWidth - 15;
    const percent = (currentValue - min) / (max - min);
    const offset = -3;

    return (
        <div className="range">
            <div className="range__ballon" style={{ left: width * percent + offset }}>
                <span className="range__ballon__value">{currentValue}</span>
                <span className="range__ballon__label">{label}</span>
            </div>

            <input
                type="range"
                value={currentValue}
                min={min}
                max={max}f
                onChange={evt => setCurrentValue(evt.target.value)}
            />
        </div>
    );
};