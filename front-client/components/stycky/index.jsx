import React, { useContext, useRef } from "react";

import {
  useStickyActions,
  useStickyState,
  StickySectionContext,
  StickyProvider
} from "../../context";
import { useObserveBottomSentinels, useObserveTopSentinels, useSentinelOffsets } from "../hooks/useSetHeader";

// import styles from "./index.module.scss";

// https://stackoverflow.com/questions/40032592/typescript-workaround-for-rest-props-in-react
/**
 * Make the element sticky
 */
function Sticky({ children, as = "div", className = "", ...rest }) {
  const { topSentinelRef, bottomSentinelRef } = useContext(
    StickySectionContext
  );
  const dispatch = useStickyActions();

  // So that we can retrieve correct child target element
  // from either a top sentinel or a bottom sentinel
  const addStickyRef = stickyRef => {
    dispatch.addStickyRef(topSentinelRef, bottomSentinelRef, stickyRef);
  };

  const Component = as;

  return (
    <Component
      ref={addStickyRef}
      className={` ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}

const noop = () => {};

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
      <Component {...rest}>
        <div
          ref={topSentinelRef}
          style={{ marginTop: `-${topSentinelMarginTop}` }}
        //   className={
        //     styles.sticky__sentinel_top +
        //     (debug ? " sticky__sentinel_debug" : "")
        //   }
        >
          sentinel top
        </div>
        {children}
        <div
          ref={bottomSentinelRef}
          style={{
            height: `${bottomSentinelHeight}`
          }}
        //   className={
        //     styles.sticky__sentinel_bottom +
        //     (debug ? " sticky__sentinel_debug" : "")
        //   }
        >
          sentinel bottom
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
      <section style={{ zIndex: 1000, position: "absolute" }}>
        <button style={{ height: "5rem" }} onClick={dispatch.toggleDebug}>
          Toggle Debug
        </button>
      </section>
      {children}
    </Component>
  );
}

/**
 * Provides sticky context to the sticky component tree.
 */
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
