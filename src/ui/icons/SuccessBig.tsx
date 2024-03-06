import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgSuccessBig = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={88}
    viewBox="0 0 89 88"
    width={89}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={44.5} cy={44} fill="#62C56D" r={44} />
    <path
      d="M67 30L39 58L25 44"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
    />
  </svg>
)
const Memo = memo(SvgSuccessBig)
export default Memo
