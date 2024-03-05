import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgWarningCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
      stroke="CurrentColor"
      strokeMiterlimit={10}
      strokeWidth={2}
    />
    <path
      d="M12 16.5V11.25"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <path
      d="M12 6.75C12.6213 6.75 13.125 7.25368 13.125 7.875C13.125 8.49632 12.6213 9 12 9C11.3787 9 10.875 8.49632 10.875 7.875C10.875 7.25368 11.3787 6.75 12 6.75Z"
      fill="CurrentColor"
    />
  </svg>
)
const Memo = memo(SvgWarningCircle)
export default Memo
