export const colors = {
  lightGray: '#fcfefe',
  aquaGray: '#8ca1b0',
  mainColor: '#28cc90',
  darkGray: '#413a58',
  white: '#ffffff',
  person: '#1AAD9E',
  organization: '#0d5aff',
  foundation: '#ED556D',
  group: '#FF8F00',
  money: '#fffeb2',
  lightPrimary: 'rgba(130, 10, 210, 0.25)',
  bgColor: '#efefef',
};

export const fontSize = {
  xSmall: '14px',
  small: '16.5px',
  normal: '19px',
  normalPlus: '22px',
  medium: '26px',
  xMedium: '32px',
  large: '46px',
  superLarge: '60px',
};

export const fontWeight = {
  normal: 400,
  bold: 700,
};

export const animations = {
  moveUp: `
    position: relative;
    top: 0;
    transition: top 0.3s ease;

    &:hover {
      top: -0.2rem;
    }
  `,
};
