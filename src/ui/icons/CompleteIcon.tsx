import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgCompleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={100}
    viewBox="0 0 101 100"
    width={101}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="#76FF7A" height={100} rx={24} width={100} x={0.5} />
    <rect fill="#0BDA51" height={80} rx={17} width={80} x={10.5} y={10} />
    <path
      d="M32.6835 50.3381L44.3283 62L56.3224 50L68.3165 38"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={9}
    />
  </svg>
)
const Memo = memo(SvgCompleteIcon)
export default Memo
