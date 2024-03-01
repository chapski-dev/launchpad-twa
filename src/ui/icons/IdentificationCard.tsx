import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgIdentificationCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={32}
    viewBox="0 0 32 32"
    width={32}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.25 14.5H22"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
    />
    <path
      d="M18.25 17.5H22"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
    />
    <path
      d="M12.6344 17.5C13.877 17.5 14.8844 16.4926 14.8844 15.25C14.8844 14.0074 13.877 13 12.6344 13C11.3918 13 10.3844 14.0074 10.3844 15.25C10.3844 16.4926 11.3918 17.5 12.6344 17.5Z"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
    />
    <path
      d="M9.72815 19.75C9.89338 19.1047 10.2687 18.5327 10.7949 18.1243C11.3211 17.7158 11.9683 17.4941 12.6344 17.4941C13.3005 17.4941 13.9477 17.7158 14.4739 18.1243C15.0001 18.5327 15.3754 19.1047 15.5406 19.75"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
    />
    <path
      d="M24.25 8.5H7.75C7.33579 8.5 7 8.83579 7 9.25V22.75C7 23.1642 7.33579 23.5 7.75 23.5H24.25C24.6642 23.5 25 23.1642 25 22.75V9.25C25 8.83579 24.6642 8.5 24.25 8.5Z"
      stroke="CurrentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
    />
  </svg>
)
const Memo = memo(SvgIdentificationCard)
export default Memo
