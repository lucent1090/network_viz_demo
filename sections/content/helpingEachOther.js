import { SUBSEC_TYPES } from '../configs/subsection';

const helpingEachOther = {
  subsections: [
    {
      type: SUBSEC_TYPES.empty,
      viewportPercent: 100,
    },
    {
      type: SUBSEC_TYPES.description,
      viewportPercent: 100,
      md: 'story line 1'
    },
    {
      type: SUBSEC_TYPES.empty,
      viewportPercent: 100,
    },
    {
      type: SUBSEC_TYPES.description,
      viewportPercent: 100,
      md: 'story line 2'
    },
    {
      type: SUBSEC_TYPES.empty,
      viewportPercent: 100,
    },
    {
      type: SUBSEC_TYPES.empty,
      viewportPercent: 100,
    },
  ],
};

export default helpingEachOther;
