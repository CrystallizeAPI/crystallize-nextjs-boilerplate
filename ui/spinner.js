import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const speedSwitch = speed => {
  if (speed === 'fast') return 600;
  if (speed === 'slow') return 900;
  return 750;
};

const animation = keyframes`
  from {transform: rotate(0deg)}
  to {transform: rotate(360deg)}
`;

const Svg = styled.svg`
  transition-property: transform;
  animation-name: ${animation};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: ${p => speedSwitch(p.speed)}ms;
`;

export const Spinner = ({
  color = 'currentColor',
  gap = 4,
  thickness = 3,
  size = '1em',
  ...props
}) => (
  <Svg
    height={size}
    width={size}
    {...props}
    role="img"
    aria-labelledby="title desc"
    viewBox="0 0 32 32"
  >
    <title id="title">Circle loading spinner</title>
    <desc id="desc">
      Image of a partial circle indicating &qoute;loading&qoute;.
    </desc>
    <circle
      role="presentation"
      cx={16}
      cy={16}
      r={14 - thickness / 2}
      stroke={color}
      fill="none"
      strokeWidth={thickness}
      strokeDasharray={Math.PI * 2 * (11 - gap)}
      strokeLinecap="round"
    />
  </Svg>
);

Spinner.propTypes = {
  color: PropTypes.string,
  thickness: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
  gap: PropTypes.oneOf([1, 2, 3, 4, 5]),
  speed: PropTypes.oneOf(['fast', 'slow']),
  size: PropTypes.string
};

Spinner.displayName = 'Spinner';
