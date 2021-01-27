import React from "react";

const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      isolation: "isolate",
      marginRight: "1.5vmin",
    }}
    viewBox="0 0 500 500"
    width="44px"
    height="44px"
    {...props}
  >
    <defs>
      <clipPath id="prefix__a">
        <path d="M0 0h500v500H0z" />
      </clipPath>
    </defs>
    <g clipPath="url(#prefix__a)">
      <circle
        vectorEffect="non-scaling-stroke"
        cx={250}
        cy={250}
        r={250}
        fill="#161D3E"
      />
      <path
        d="M105.235 121.153l295.366-1.768-297.134 261.761 298.903-.884-297.135-259.109z"
        fill="#15C5BA"
      />
    </g>
  </svg>
);

export default SvgComponent;
