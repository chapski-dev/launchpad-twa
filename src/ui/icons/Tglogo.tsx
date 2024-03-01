import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgTglogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={56}
    viewBox="0 0 58 56"
    width={58}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_3551_1942)">
      <rect fill="white" height={32} rx={16} width={32} x={12} y={8} />
      <rect
        height={31.5}
        rx={15.75}
        stroke="#EFEFF3"
        strokeWidth={0.5}
        width={31.5}
        x={12.25}
        y={8.25}
      />
      <path
        d="M34.6112 16.6325C32.2167 17.6242 21.9495 21.877 19.1127 23.0361C17.2102 23.7785 18.324 24.4746 18.324 24.4746C18.324 24.4746 19.948 25.0314 21.3402 25.449C22.7323 25.8667 23.4747 25.4027 23.4747 25.4027L30.0175 20.9944C32.3376 19.4167 31.7808 20.7159 31.2238 21.2729C30.0175 22.4795 28.0221 24.3818 26.3516 25.9132C25.6092 26.5628 25.9803 27.1196 26.3053 27.398C27.5117 28.419 30.8064 30.5071 30.9919 30.6463C31.9721 31.3402 33.9003 32.3392 34.1936 30.2286L35.3536 22.9434C35.725 20.4842 36.0961 18.2104 36.1424 17.5607C36.2817 15.9829 34.6112 16.6325 34.6112 16.6325Z"
        fill="#2381CC"
      />
    </g>
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height={60}
        id="filter0_d_3551_1942"
        width={60}
        x={-2}
        y={0}
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          operator="erode"
          radius={6}
          result="effect1_dropShadow_3551_1942"
        />
        <feOffset dy={6} />
        <feGaussianBlur stdDeviation={10} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"
        />
        <feBlend
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow_3551_1942"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3551_1942"
          mode="normal"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
const Memo = memo(SvgTglogo)
export default Memo
