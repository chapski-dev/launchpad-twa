import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgCloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={16}
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.9874 3.00304L3.00407 12.9865M13 13L3 3"
      stroke="#999999"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
    />
  </svg>
)
const Memo = memo(SvgCloseIcon)
export default Memo
