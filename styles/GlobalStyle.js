import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { fontSize, fontWeight } from './variables';

const GlobalStyle = createGlobalStyle`
${normalize}

body {
  font-family: 'Roboto', helvetica, 'PingFang TC', 'Noto Sans TC', 'Microsoft JhengHei', sans-serif;
  font-size: ${fontSize.normal};
  font-weight: ${fontWeight.normal};
  margin: 0;
  line-height: 1.85;
  letter-spacing: 0.4px;
  color: ${props => (props.whiteColor ? 'white' : 'black')};
  ${props => props.isLoaded ? '' : 'overflow: hidden;'}
}

svg {
  overflow: visible;
}

.opacity-trans {
  transition: opacity 0.25s ease-in-out;
}

.opacity-slow {
  transition: opacity 0.5s ease-in-out;
}

.all-trans {
  transition: all 0.3s linear;
  transform: translateZ(0);
}

.graph-groups {
  transition-property: transform;
  transition-timing-function: ease-in-out;
  transition-duration: 800ms;
}
`;

export default GlobalStyle;
