
import { rawAll } from './raw';

const frames = [
  {
    data: rawAll,
    focus: ['big-brother', '1-organization-type1'],
    highlights: ['big-brother'],
  },
  {
    data: rawAll,
    focus: ['big-brother', '1-organization-type1'],
    highlights: ['big-brother'],
  },
  {
    data: rawAll,
    focus: ['big-brother', '2-organization-way'],
    highlights: ['big-brother'],
  },
  {
    data: rawAll,
    focus: ['big-brother', '1-organization-type1', '3-person-type2', '5-organization-hong'],
    showLinkNum: ['big-brother'],
    highlights: ['big-brother', '1-organization-type1', '2-organization-way', '3-person-type2', '4-person-type3', '5-organization-hong'],
  },
  {
    data: rawAll,
    focus: ['big-brother', '1-organization-type1', '1-A', '1-D', '1-G'],
    highlights: ['big-brother', '1-organization-type1', '2-organization-way', '3-person-type2', '4-person-type3', '5-organization-hong'],
  },
  {
    data: rawAll,
    focus: ['1-organization-type1', '1-A', '1-D', '1-G'],
    showLinkNum: ['1-organization-type1'],
    highlights: ['1-organization-type1', '1-A', '1-B', '1-C', '1-D', '1-E', '1-F', '1-G'],
  },
  {
    data: rawAll,
    focus: ['2-organization-way', '2-A', '2-G'],
    showLinkNum: ['2-organization-way'],
    highlights: ['2-organization-way', '2-A', '2-B', '2-C', '2-D', '2-E', '2-F', '2-G'],
  },
  {
    data: rawAll,
    focus: ['5-organization-hong', '4-A', '4-C', '4-F'],
    showLinkNum: ['5-organization-hong'],
    highlights: ['5-organization-hong', '4-A', '4-B', '4-C', '4-D', '4-E', '4-F', '4-G'],
  },
  {
    data: rawAll,
    focus: ['5-organization-hong', '4-A', '4-C', '4-F'],
    showLinkNum: ['5-organization-hong'],
    highlights: ['5-organization-hong', '4-A', '4-B', '4-C', '4-D', '4-E', '4-F', '4-G'],
  },
];

export default frames;
