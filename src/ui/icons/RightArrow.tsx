import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgRightArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="#999999"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
    />
  </svg>
)
const Memo = memo(SvgRightArrow)
export default Memo
