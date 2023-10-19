import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgTrxArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={24}
    viewBox="0 0 12 24"
    width={12}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 18L9 12L3 6"
      stroke="#2381CC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
    />
  </svg>
)
const Memo = memo(SvgTrxArrow)
export default Memo
