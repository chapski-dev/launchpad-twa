import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgTick = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={28}
    viewBox="0 0 39 28"
    width={39}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.68347 14.3381L13.3283 26L37.3165 2"
      stroke="#2381CC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
    />
  </svg>
)
const Memo = memo(SvgTick)
export default Memo
