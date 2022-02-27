import React, { useContext, useRef } from "react";
import ScrollNav from "../../components/hooks/useScrollNav";
import { useObserveBottomSentinels, useObserveTopSentinels, useSentinelOffsets } from "../../components/hooks/useSetHeader";
import { StickyProvider, StickySectionContext, useStickyActions, useStickyState } from "../../context/contextsticky";
import styles from './Home.module.css'

function Sticky({ children, as = "div", className = "", ...rest }) {
    const { topSentinelRef, bottomSentinelRef } = useContext(
        StickySectionContext
    );
    const dispatch = useStickyActions();
    const addStickyRef = stickyRef => {
        dispatch.addStickyRef(topSentinelRef, bottomSentinelRef, stickyRef);
    };
    const Component = as;
    return (
        <Component ref={addStickyRef} className={styles.sticky + className || ` ${className}`} {...rest} >
            {children}
        </Component>
    );
}

const noop = () => { };

/**
 * A section, in which <Sticky /> element element is observed
 */
function StickyBoundary({
    as = "section",
    onChange = noop,
    onStuck = noop,
    onUnstuck = noop,
    children,
    ...rest
}) {
    const Component = as;

    const { debug } = useStickyState();
    const topSentinelRef = useRef(null);
    const bottomSentinelRef = useRef(null);

    const { bottomSentinelHeight, topSentinelMarginTop } = useSentinelOffsets(
        topSentinelRef
    );

    useObserveTopSentinels(topSentinelRef, {
        events: {
            onChange,
            onStuck,
            onUnstuck
        }
    });

    useObserveBottomSentinels(bottomSentinelRef, {
        events: {
            onChange,
            onStuck,
            onUnstuck
        }
    });

    const value = { topSentinelRef, bottomSentinelRef };

    return (
        <StickySectionContext.Provider value={value}>
            <Component className={styles.sticky__section} {...rest}>
                <div
                    ref={topSentinelRef}
                    style={{ marginTop: `-${topSentinelMarginTop}` }}
                >
                </div>
                {children}
                <div
                    ref={bottomSentinelRef}
                    style={{
                        height: `${bottomSentinelHeight}`
                    }}
                >
                </div>
            </Component>
        </StickySectionContext.Provider>
    );
}

/**
 * Ref to the sticky viewport
 */
function StickyRoot({ children, as: Component = "div", ...rest }) {
    const dispatch = useStickyActions();

    const addContainerRef = containerRef => {
        dispatch.setContainerRef(containerRef);
    };
    return (
        <Component ref={addContainerRef} {...rest}>
            {children}
        </Component>
    );
}

function StickyViewport({ children, as = "div", ...rest }) {
    return (
        <StickyProvider>
            <StickyRoot as={as} {...rest}>
                {children}
            </StickyRoot>
        </StickyProvider>
    );
}

export { StickyViewport, StickyBoundary, Sticky };
