import raw from './raw';

const frames = [
  {
    data: raw,
  },
  {
    data: raw,
    focus: ['node-0', 'node-4', 'node-5'],
    highlights: ['link-0-4', 'link-0-5'],
  },
  {
    data: raw,
    focus: ['node-3', 'node-6', 'node-7', 'node-8'],
    highlights: ['link-3-6', 'link-3-7', 'link-3-8'],
  },
  {
    data: raw,
    focus: ['node-4', 'node-5', 'node-6', 'node-9'],
    highlights: ['link-4-9', 'link-5-9', 'link-6-9'],
  },
  {
    data: raw,
    focus: ['node-3', 'node-6', 'node-7', 'node-8'],
    highlights: ['link-3-6', 'link-3-7', 'link-3-8'],
  },
  {
    data: raw,
    focus: ['node-3', 'node-6', 'node-7', 'node-8'],
    highlights: ['link-3-6', 'link-3-7', 'link-3-8'],
  },
];

export default frames;
