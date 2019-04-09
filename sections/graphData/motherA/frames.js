import { raw } from './raw';

const frames = [
  {
    data: raw,
    focus: ['0-motherA', '1-type1', '2-type2', '3-type3', '4-type4'],
    highlights: ['0-motherA', '1-type1', '2-type2', '3-type3', '4-type4'],
  },
  {
    data: raw,
    focus: ['0-motherA', '1-type1', '2-type2', '3-type3', '4-type4'],
    showLinkNum: ['0-motherA'],
    highlights: ['0-motherA', '2-type2', '3-type3', '4-type4'],
  },
  {
    data: raw,
    focus: ['2-type2', '5-type5'],
    showLinkNum: ['2-type2'],
    highlights: ['0-motherA', '2-type2', '5-type5'],
  },
  {
    data: raw,
    focus: [
      '5-type5',
      '9-foundation-type6',
      '10-foundation-type9',
      '11-foundation-type6',
    ],
    showLinkNum: ['5-type5'],
    highlights: [
      '2-type2',
      '5-type5',
      '9-foundation-type6',
      '10-foundation-type9',
      '11-foundation-type6',
    ],
  },
  {
    data: raw,
    focus: [
      '5-type5',
      '6-group-type6',
      '7-group-type7',
      '8-group-type8',
    ],
    showLinkNum: ['5-type5'],
    highlights: [
      '2-type2',
      '5-type5',
      '6-group-type6',
      '7-group-type7',
      '8-group-type8',
    ],
  },
  {
    data: raw,
    focus: ['0-motherA', '3-type3', '4-type4'],
    showLinkNum: ['0-motherA'],
    highlights: ['0-motherA', '3-type3', '4-type4'],
  },
  {
    data: raw,
    focus: ['0-motherA', '2-type2', '3-type3', '4-type4'],
    showLinkNum: ['0-motherA'],
    highlights: ['0-motherA'],
  },
  {
    data: raw,
    focus: ['0-motherA', '2-type2', '3-type3', '4-type4'],
    showLinkNum: ['0-motherA'],
    highlights: ['0-motherA'],
  },
];

export default frames;
// '0-motherA'
// '1-type1'
// '2-type2'
// '3-type3'
// '4-type4'
// '5-type5'
// '6-group-type6',
// '7-group-type7',
// '8-group-type8',
// '9-foundation-type6',
// '10-foundation-type9',
// '11-foundation-type6',
