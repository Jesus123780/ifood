import React from 'react'
// import { render } from 'react-dom';
// import './styles.css';

const htmlText =
  '<p style=\'display:inline;\'>Lorem ipsum</p> dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'

export default function ShowHtml() {
  const [state, setState] = React.useState({
    showOriginalHTML: false,
    originalHTML: htmlText
  })

  const handleShowText = React.useCallback(() => {
    setState(prevState => {return {
      ...prevState,
      showOriginalHTML: !prevState.showOriginalHTML
    }})
  }, [setState])

  return (
    <div className='container'>
      <div
        className='text'
        dangerouslySetInnerHTML={{
          __html: `${
            state.originalHTML
          }`
        }}
      />
      <button className='read-more' onClick={handleShowText}>
        {!state.showOriginalHTML ? 'read more' : 'show less'}
      </button>
    </div>
  )
}