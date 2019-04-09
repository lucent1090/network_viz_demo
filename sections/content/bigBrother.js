import { SUBSEC_TYPES } from '../configs/subsection';

const bigBrother = {
  subsections: [
    {
      type: SUBSEC_TYPES.component,
      viewportPercent: 100,
    },
    {
      type: SUBSEC_TYPES.empty,
      viewportPercent: 120,
    },
    {
      type: SUBSEC_TYPES.description,
      viewportPercent: 130,
      md: 'story line 1'
    },
    {
      type: SUBSEC_TYPES.description,
      viewportPercent: 140,
      md: 'story line 2',
    },
    {
      type: SUBSEC_TYPES.description,
      viewportPercent: 150,
      md: 'story line 3',
    },
    {
      type: SUBSEC_TYPES.description,
      viewportPercent: 150,
      md: 'story line 4',
    },
    {
      type: SUBSEC_TYPES.description,
      viewportPercent: 130,
      md: 'story line 5',
    },
    {
      type: SUBSEC_TYPES.description,
      viewportPercent: 110,
      md: 'story line 6',
    },
    {
      type: SUBSEC_TYPES.empty,
      viewportPercent: 50,
    },
  ],
};

export default bigBrother;
