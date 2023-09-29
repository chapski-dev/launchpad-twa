import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgTonupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={20}
    viewBox="0 0 20 20"
    width={20}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={9.99927} cy={10} fill="#0086CC" r={10} />
    <path
      clipRule="evenodd"
      d="M3.34747 8.0544L6.39013 4.44446H13.6616L16.6527 8.0544L15.453 9.91707L9.53593 8.5701L14.0741 8.15754L12.4755 6.19786H7.62783L5.97757 8.15754L9.9485 13.5209L10.7736 12.5926L9.38122 10.6329L12.9726 13.1615L10.0516 16.6667L3.34747 8.0544Z"
      fill="white"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M7.26666 8.72488L13.5067 12.4895L16.3431 10.994L7.26666 8.72488ZM10.0515 9.91101L12.4753 11.2518L12.1143 10.5814L10.0515 9.91101Z"
      fill="white"
      fillRule="evenodd"
    />
  </svg>
)
const Memo = memo(SvgTonupIcon)
export default Memo
