import PropTypes from 'prop-types'
import React, { useContext, useRef } from 'react'
import { useObserveBottomSentinels, useObserveTopSentinels, useSentinelOffsets } from '../../components/hooks/useSetHeader'
// eslint-disable-next-line no-unused-vars
import { StickyProvider, StickySectionContext, useStickyActions } from '../../context/contextsticky'
import styles from './Home.module.css'

function Sticky({ children, as = 'div', className = '', ...rest }) {
  const { topSentinelRef, bottomSentinelRef } = useContext(StickySectionContext)
  const dispatch = useStickyActions()
  const addStickyRef = stickyRef => {
    dispatch.addStickyRef(topSentinelRef, bottomSentinelRef, stickyRef)
  }
  const Component = as

  return (
    <Component
      className={styles.sticky + className || ` ${className}`}
      ref={addStickyRef}
      {...rest}
    >
      {children}
    </Component>
  )
}

Sticky.propTypes = {
  as: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string
}
const noop = () => { return }
/**
 * A section, in which <Sticky /> element element is observed
 */
function StickyBoundary({
  as = 'section',
  onChange = noop,
  onStuck = noop,
  onUnstuck = noop,
  children,
  ...rest
}) {
  const Component = as

  // const { debug } = useStickyState();
  // console.log(debug)
  const topSentinelRef = useRef(null)
  const bottomSentinelRef = useRef(null)

  const { bottomSentinelHeight, topSentinelMarginTop } = useSentinelOffsets(
    topSentinelRef
  )

  useObserveTopSentinels(topSentinelRef, {
    events: {
      onChange,
      onStuck,
      onUnstuck
    }
  })

  useObserveBottomSentinels(bottomSentinelRef, {
    events: {
      onChange,
      onStuck,
      onUnstuck
    }
  })

  const value = { topSentinelRef, bottomSentinelRef }
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
  )
}

StickyBoundary.propTypes = {
  as: PropTypes.string,
  children: PropTypes.any,
  onChange: PropTypes.func,
  onStuck: PropTypes.func,
  onUnstuck: PropTypes.func
}

/**
 * Ref to the sticky viewport
 */
function StickyRoot({ children, as: Component = 'div', ...rest }) {
  const dispatch = useStickyActions()
  const addContainerRef = containerRef => {
    dispatch.setContainerRef(containerRef)
  }
  return (
    <Component ref={addContainerRef} {...rest}>
      {children}
    </Component>
  )
}

StickyRoot.propTypes = {
  as: PropTypes.string,
  children: PropTypes.any
}

function StickyViewport({ children, as = 'div', ...rest }) {
  return (
    <StickyProvider>
      <StickyRoot as={as} {...rest}>
        {children}
      </StickyRoot>
    </StickyProvider>
  )
}

StickyViewport.propTypes = {
  as: PropTypes.string,
  children: PropTypes.any
}

export { StickyViewport, StickyBoundary, Sticky }
