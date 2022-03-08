import { gql, useMutation, resetApolloContext } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef } from "react";
import { useObserveBottomSentinels, useObserveTopSentinels, useSentinelOffsets } from "../../components/hooks/useSetHeader";
import { StickyProvider, StickySectionContext, useStickyActions, useStickyState } from "../../context/contextsticky";
import styles from './Home.module.css'

function Sticky({ children, as = "div", className = "", ...rest }) {
    const { topSentinelRef, bottomSentinelRef } = useContext(StickySectionContext)
    const dispatch = useStickyActions();
    const addStickyRef = stickyRef => {
        dispatch.addStickyRef(topSentinelRef, bottomSentinelRef, stickyRef);
    };
    const Component = as;
    const VIEW_VISITOR = gql`
        mutation setVisitorStore($input: InputVisitorStoreType) {
        setVisitorStore(input: $input) {
            success
            message
        }
        }
    `
    const [setVisitorStore] = useMutation(VIEW_VISITOR);
    const location = useRouter();
    useEffect(() => {
        let UserId = window.localStorage.getItem('usuario')
        console.log(UserId, 'papuuu')
        setVisitorStore({
            variables: {
                input: {
                    id: !!UserId && UserId,
                    idStore: location.query.id,
                }
            }
        }).catch(err => console.log({ message: `${err}` }))
    }, [location.query])
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
    console.log(debug)
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
