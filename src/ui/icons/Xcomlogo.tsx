import * as React from 'react'
import { SVGProps, memo } from 'react'
const SvgXcomlogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={56}
    viewBox="0 0 58 56"
    width={58}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_3551_1952)">
      <rect fill="black" height={32} rx={16} width={32} x={12} y={8} />
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
        d="M29.524 22.7756L35.481 16H34.0696L28.8948 21.882L24.7647 16H20L26.2469 24.8953L20 32H21.4114L26.8728 25.787L31.2353 32H36L29.524 22.7756ZM27.5902 24.9734L26.9563 24.0871L21.9204 17.0412H24.0887L28.154 22.7296L28.7852 23.6159L34.0689 31.0096H31.9006L27.5902 24.9734Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height={60}
        id="filter0_d_3551_1952"
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
          result="effect1_dropShadow_3551_1952"
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
          result="effect1_dropShadow_3551_1952"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_3551_1952"
          mode="normal"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
const Memo = memo(SvgXcomlogo)
export default Memo
