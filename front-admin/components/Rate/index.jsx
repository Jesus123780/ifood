import React, { useMemo, useState } from 'react';
import { IconRate } from '../../public/icons';
import { ContentIcon } from './styled';
export const Rate = ({ count, rating, color, onRating, size, noHover }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const getColor = index => {
        if (hoverRating >= index) {
            return color?.filled;
        } else if (!hoverRating && rating >= index) {
            return color?.filled;
        }

        return color.unfilled;
    };

    const starRating = useMemo(() => {
        return (<ContentIcon>
            {Array(count)
                .fill(0)
                .map((_, i) => i + 1)
                .map(idx => (
                    <div
                        key={idx}
                        icon="star"
                        onClick={() => onRating ? onRating(idx) : {}}
                        onMouseEnter={() => onRating ? !noHover && setHoverRating(idx) : {}}
                        onMouseLeave={() => onRating ? setHoverRating(0) : {}}
                    ><IconRate color={getColor(idx)} size={size} />
                    </div>
                ))}
        </ContentIcon>
        )
    }, [count, rating, hoverRating]);

    return <div>{starRating}</div>;
};

Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: '#ffbc00',
        unfilled: '#DCDCDC',
    },
};