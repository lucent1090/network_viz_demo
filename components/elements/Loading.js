import styled, { keyframes } from 'styled-components'
import { Spring } from 'react-spring';
import { colors } from '../../styles/variables'

const Rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
const Wrapper = styled.div`
  position: fixed;
  height: 2.8rem;
  width: 2.8rem;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1005;
  border-radius: 50%;
`

const Spinner = styled.div`
  height: 2rem;
  width: 2rem;
  animation: ${Rotate} 0.8s infinite linear;
  border: 4px solid ${colors.mainColor};
  border-right-color: transparent;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
`

const Loading = () => (
  <Spring
    from={{ opacity: 1 }}
    to={{ opacity: 0 }}>
    {props => (
      <Wrapper style={props}>
        <Spinner />
      </Wrapper>)
    }
  </Spring>
)

export default Loading