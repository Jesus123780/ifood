import PropTypes from 'prop-types'
import styled from 'styled-components'

export const FlipCard = ({ frontChild, backChild, flipped, setFlipped, onClick }) => {
  return (
    <CardContainer onClick={() => { return onClick() }}>
      <div className={`flip-card ${flipped ? 'flipped' : ''}`}>
        <div className='flip-card-inner'>
          <div className='flip-card-front'>
            {frontChild}
            <div
              className='flip-icon icon-front'
              onClick={() => {
                setFlipped(!flipped)
              }}
            >
              <svg
                fill='none'
                viewBox='0 0 34 23'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='m8.9823 4.7153c-0.10684-0.36037-0.43732-0.59398-0.79604-0.59398-0.0786 0-0.15776 0.01107-0.23637 0.03432-4.9783 1.478-7.9498 4.0959-7.9498 7.0044-2.013e-7 4.604 7.3951 8.2111 16.837 8.2111 0.258 0 0.5226-0.0072 0.7866-0.0128l-0.9028 1.7504c-0.2104 0.4069-0.0504 0.9084 0.3576 1.1188 0.4074 0.2098 0.9078 0.0504 1.1187-0.3576l1.5567-3.0181c0.0077-0.0144 0.0116-0.0299 0.0171-0.0448 0.0128-0.0288 0.0255-0.0576 0.0349-0.0875 0.0011-0.0038 0.0028-0.0066 0.0039-0.0099 5e-3 -0.0172 0.0083-0.0349 0.0116-0.0526 0.0072-0.0321 0.0139-0.0631 0.0177-0.0969 6e-4 -0.0028 0.0011-0.0061 0.0017-0.0089 0.0022-0.0238 0.0017-0.0465 0.0017-0.0703 0-0.0204 0.0033-0.0409 0.0022-0.062-6e-4 -0.0083-0.0028-0.0149-0.0039-0.0227v-0.0066c-0.0017-0.0177-0.0061-0.0349-0.01-0.0531-0.0055-0.0355-0.011-0.0709-0.021-0.1047 0-5e-4 -6e-4 -0.0011-6e-4 -0.0016-0.0155-0.0526-0.0354-0.1019-0.0597-0.1489l-1.5528-3.0098c-0.1478-0.2856-0.4379-0.4495-0.7385-0.4495-0.1278 0-0.2585 0.0299-0.3803 0.093-0.4074 0.2104-0.5674 0.7108-0.357 1.1188l0.961 1.8622c-0.2846 0.0077-0.568 0.0138-0.8448 0.0138-8.2266 0-15.177-2.9998-15.177-6.5504 0-2.1002 2.5907-4.1739 6.7619-5.4122 0.43953-0.13008 0.68974-0.59231 0.55966-1.0318zm7.8551-1.7664c-0.2591 0-0.5231 0.00664-0.7866 0.01218l0.9029-1.7498c0.2103-0.40743 0.0503-0.90841-0.3576-1.1188-0.1218-0.062554-0.2519-0.092446-0.3798-0.092446-0.3017-1.3187e-8 -0.5912 0.16386-0.739 0.4495l-1.5566 3.0181c-0.0083 0.0144-0.0117 0.031-0.0178 0.04595-0.0127 0.02879-0.0254 0.05757-0.0343 0.08802-0.0011 0.00277-0.0033 0.00553-0.0039 0.00885-0.0055 0.01772-0.0083 0.03543-0.0116 0.0537-0.0077 0.03155-0.0144 0.06255-0.0177 0.09521-5e-4 0.00277-0.0017 0.00609-0.0017 0.00886-0.0027 0.02713-0.0022 0.0537-0.0022 0.08082v0.00111c0 0.01716-0.0027 0.03432-0.0016 0.05148 5e-4 0.00775 0.0027 0.0144 0.0038 0.02215v0.00608c0.0028 0.02768 0.0089 0.05425 0.0139 0.08082 0 5.6e-4 5e-4 5.6e-4 5e-4 5.6e-4 5e-3 0.02436 0.0089 0.04927 0.0155 0.07252 0 0.0011 0 0.00221 6e-4 0.00332 0.0066 0.02159 0.0155 0.04207 0.0243 0.06255 0.01 0.02436 0.0172 0.04982 0.0294 0.07252 0.0011 0.00277 0.0016 0.00553 0.0028 0.00775l1.5566 3.0175c0.2104 0.40743 0.7108 0.56686 1.1188 0.35761 0.4074-0.21036 0.5674-0.71079 0.357-1.1188l-0.961-1.8628c0.284-0.0072 0.5669-0.01329 0.8448-0.01329 8.2266 0 15.177 2.9998 15.177 6.5504 0 2.1003-2.5907 4.1745-6.7613 5.4123-0.4395 0.1301-0.6903 0.5923-0.5596 1.0318 0.1301 0.4401 0.5929 0.6903 1.0318 0.5603 4.9777-1.4781 7.9493-4.0965 7.9493-7.0044 0.0011-4.6046-7.3946-8.2116-16.836-8.2116z'
                  fill='#fff'
                  opacity='.8'
                />
              </svg>
            </div>
          </div>
          <div className='flip-card-back'>
            {backChild}
            <div className='flip-icon icon-back' onClick={() => { setFlipped(!flipped) }} >

            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  )
}

FlipCard.propTypes = {
  backChild: PropTypes.any,
  flipped: PropTypes.any,
  frontChild: PropTypes.any,
  setFlipped: PropTypes.func
}


const CardContainer = styled.div`
  cursor: pointer;
  height: 100px;
  height: 100px;
  display: flex;
  position: relative;

  .flip-icon {
    position: absolute;
    bottom: 15px;
    right: 10px;
    width: 32px;
    height: 40px;
  }
  .icon-front {
    z-index: 2;
  }

  .icon-back {
    z-index: 4;
  }

  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 100%;
    perspective: 1000px;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flipped .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

  .flip-card-front {
    z-index: 1;
  }

  .flip-card-back {
    /* overflow: hidden; */
    z-index: 3;
    transform: rotateY(180deg);
  }
`
