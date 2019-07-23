import React from 'react'

const SvgComponent = props => (
  <svg
    style={{
      isolation: 'isolate',
      marginRight: '10px'
    }}
    viewBox="0 0 640 640"
    width="44px"
    height="44px"
    {...props}
  >
    <defs>
      <clipPath id="prefix__a">
        <path d="M0 0h640v640H0z" />
      </clipPath>
    </defs>
    <g
      style={{
        isolation: 'isolate',
      }}
      clipPath="url(#prefix__a)"
    >
      <linearGradient
        id="prefix__b"
        x1={0.5}
        y1={0}
        x2={0.5}
        y2={1}
        gradientTransform="matrix(281 0 0 435 78 24)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#fff" />
        <stop offset="0%" stopColor="#016465" />
        <stop offset="97.826%" stopColor="#69b447" />
      </linearGradient>
      <path
        d="M298 24l61 57-161 161 153 158-60 59L78 243 298 24z"
        fill="url(#prefix__b)"
      />
      <linearGradient
        id="prefix__c"
        x1={0.5}
        y1={0}
        x2={0.5}
        y2={1}
        gradientTransform="matrix(279 0 0 434 283 183)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#fff" />
        <stop offset="0%" stopColor="#016465" />
        <stop offset="97.826%" stopColor="#69b447" />
      </linearGradient>
      <path
        d="M289 241l157 154-163 164 57 58 222-221-212-213-61 58z"
        fill="url(#prefix__c)"
      />
    </g>
  </svg>
)

export default SvgComponent
