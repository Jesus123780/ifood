import { useEffect, useState } from 'react';

export const useOnScreen = (threshold = 0.6) => {
    const [isVisible, setIsVisible] = useState(false);
    const [ref, setRef] = useState(null);

    useEffect(
        () => {
            let observer;
            if (ref) {
                observer = new IntersectionObserver(
                    ([entry]) => {
                        setIsVisible(entry.isIntersecting);
                    },
                    {
                        // rootMargin,
                        threshold
                    }
                );
                observer.observe(ref);
            }

            return () => {
                if (ref && observer) observer.unobserve(ref);
            };
        },
        [ref]
    );

    return [setRef, isVisible];
};