import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={16}
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.5 13C10.5376 13 13 10.5376 13 7.5C13 4.46243 10.5376 2 7.5 2C4.46243 2 2 4.46243 2 7.5C2 10.5376 4.46243 13 7.5 13Z"
      stroke="#999999"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
    />
    <path
      d="M12 12L14 14"
      stroke="#999999"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.4}
    />
  </svg>
)
const Memo = memo(SvgSearch)
export default Memo
