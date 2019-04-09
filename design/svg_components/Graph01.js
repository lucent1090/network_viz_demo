import React from "react";

const SvgGraph01 = props => (
  <svg
    viewBox="0 0 1600 900"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={1.414}
    {...props}
  >
    <g transform="translate(70.49 -72.666)">
      <circle cx={311.25} cy={310.138} r={130.38} fill="#2bd563" />
      <text
        x={242.383}
        y={308.135}
        fontFamily="'ArialMT','Arial',sans-serif"
        fontSize={33}
        transform="translate(18.936 19.662)"
      >
        {"Node 1"}
      </text>
    </g>
    <g transform="translate(906.485 69.206)">
      <circle cx={311.25} cy={310.138} r={130.38} fill="#ebebeb" />
      <text
        x={242.383}
        y={308.135}
        fontFamily="'ArialMT','Arial',sans-serif"
        fontSize={33}
        transform="translate(22.776 23.004)"
      >
        {"Node 2"}
      </text>
    </g>
  </svg>
);

export default SvgGraph01;
