import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgSpinnerLoader = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 3V6"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{ transformOrigin: '12px 12px' }}
    />
    <path
      d="M18.3656 5.63428L16.2469 7.75303"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{ transformOrigin: '12px 12px' }}
    />
    <path
      d="M21 12H18"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{ transformOrigin: '12px 12px' }}
    />
    <path
      d="M18.3656 18.3658L16.2469 16.2471"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{ transformOrigin: '12px 12px' }}
    />
    <path
      d="M12 21V18"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{ transformOrigin: '12px 12px' }}
    />
    <path
      d="M5.6344 18.3658L7.75315 16.2471"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{ transformOrigin: '12px 12px' }}
    />
    <path
      d="M3 12H6"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{ transformOrigin: '12px 12px' }}
    />
    <path
      d="M5.6344 5.63428L7.75315 7.75303"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      style={{ transformOrigin: '12px 12px' }}
    />
  </svg>
)
const Memo = memo(SvgSpinnerLoader)
export default Memo
