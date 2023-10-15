import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgToncoinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect fill="#2381CC" height={24} rx={12} width={24} />
    <path
      d="M12.1074 17.3935C12.0605 17.4715 11.9395 17.4715 11.8926 17.3935L6.89137 9.06662C6.48068 8.38284 7.01395 7.54169 7.85814 7.54169L16.1419 7.54169C16.9861 7.54169 17.5193 8.38284 17.1086 9.06662L12.1074 17.3935Z"
      stroke="white"
      strokeWidth={1.4}
    />
    <path
      d="M12 7.54169L12 17.4584"
      stroke="white"
      strokeLinecap="round"
      strokeWidth={1.4}
    />
  </svg>
)
const Memo = memo(SvgToncoinIcon)
export default Memo
