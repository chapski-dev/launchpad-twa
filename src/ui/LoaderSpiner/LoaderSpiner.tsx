import React, { FunctionComponent, ReactElement } from 'react'
import { SvgWrapper } from './style'
import { BaseProps, DEFAULT_COLOR, DEFAULT_WAI_ARIA_ATTRIBUTE, SEC_DEFAULT_COLOR } from './type'

interface OvalProps extends BaseProps {
  strokeWidth?: string | number
  strokeWidthSecondary?: string | number
  secondaryColor?: string
}

/**
 * The radius of the circle
 * The Loader size is set with the width and height of the SVG
 * @type {number}
 */
const RADIUS: number = 20

/**
 * Compute Path depending on circle radius
 * The structure with radius 20 is "M20 0c0-9.94-8.06-20-20-20"
 * @param radius of the circle radius default 20
 * @returns {string}
 */
const getPath = (radius: number): string => {
  return ['M' + radius + ' 0c0-9.94-8.06', radius, radius, radius].join('-')
}
/**
 * Compute the size of the view box depending on the radius and Stroke-Width
 * @param strokeWidth Stroke-Width of the full circle
 * @param secondaryStrokeWidth Stroke-Width of the 1/4 circle
 * @param radius radius of the circle
 * @returns {string}
 */
const getViewBoxSize = (
  strokeWidth: number,
  secondaryStrokeWidth: number,
  radius: number
): string => {
  const maxStrokeWidth = Math.max(strokeWidth, secondaryStrokeWidth)
  const startingPoint = -radius - maxStrokeWidth / 2 + 1
  const endpoint = radius * 2 + maxStrokeWidth
  return [startingPoint, startingPoint, endpoint, endpoint].join(' ')
}

const Oval: FunctionComponent<OvalProps> = ({
  height = 80,
  width = 80,
  color = DEFAULT_COLOR,
  secondaryColor = SEC_DEFAULT_COLOR,
  ariaLabel = 'oval-loading',
  wrapperStyle,
  wrapperClass,
  visible = true,
  strokeWidth = 2,
  strokeWidthSecondary,
}): ReactElement => (
  <SvgWrapper
    $visible={visible}
    aria-label={ariaLabel}
    className={wrapperClass}
    data-testid="oval-loading"
    style={wrapperStyle}
    {...DEFAULT_WAI_ARIA_ATTRIBUTE}
  >
    <svg
      data-testid="oval-svg"
      height={height}
      stroke={color}
      viewBox={getViewBoxSize(
        Number(strokeWidth),
        Number(strokeWidthSecondary || strokeWidth),
        RADIUS
      )}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g
          data-testid="oval-secondary-group"
          strokeWidth={Number(strokeWidthSecondary || strokeWidth)}
          transform="translate(1 1)"
        >
          <circle
            cx="0"
            cy="0"
            r={RADIUS}
            stroke={secondaryColor}
            strokeOpacity=".5"
            strokeWidth={strokeWidth}
          />
          <path d={getPath(RADIUS)}>
            <animateTransform
              attributeName="transform"
              dur="1s"
              from="0 0 0"
              repeatCount="indefinite"
              to="360 0 0"
              type="rotate"
            />
          </path>
        </g>
      </g>
    </svg>
  </SvgWrapper>
)

export default Oval;