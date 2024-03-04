import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgWalletImg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={32}
    viewBox="0 0 32 32"
    width={32}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.75 10V22C7.75 22.3978 7.90804 22.7794 8.18934 23.0607C8.47064 23.342 8.85218 23.5 9.25 23.5H24.25C24.4489 23.5 24.6397 23.421 24.7803 23.2803C24.921 23.1397 25 22.9489 25 22.75V12.25C25 12.0511 24.921 11.8603 24.7803 11.7197C24.6397 11.579 24.4489 11.5 24.25 11.5H9.25C8.85218 11.5 8.47064 11.342 8.18934 11.0607C7.90804 10.7794 7.75 10.3978 7.75 10ZM7.75 10C7.75 9.60218 7.90804 9.22064 8.18934 8.93934C8.47064 8.65804 8.85218 8.5 9.25 8.5H22"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
    />
    <path
      d="M20.875 18.625C21.4963 18.625 22 18.1213 22 17.5C22 16.8787 21.4963 16.375 20.875 16.375C20.2537 16.375 19.75 16.8787 19.75 17.5C19.75 18.1213 20.2537 18.625 20.875 18.625Z"
      fill="CurrentColor"
    />
  </svg>
)
const Memo = memo(SvgWalletImg)
export default Memo
