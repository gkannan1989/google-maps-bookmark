/**
 * @memberOf components.Globals
 * @namespace components.Globals.Icon
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StyledIcon } from './styles';

/**
 * function represents an icon component
 * @memberOf components.Globals.Icon
 * @function Icon
 * @description
 * renders an SVG font icon
 * @param {object}   props     - props of component that were given by parent
 * @return {jsx} - jsx component to show
 * @example
 * <Icon
     name={name}
     size={size}
     className={className}
   />
 */
const Icon = props => {
  const { name, size, className } = props;
  return (
    <StyledIcon
      className={`icon icon-${name} ${className || ''}`}
      size={size}
    />
  );
};

/**
 * @memberOf components.Globals.Icon
 * @name propTypes
 * @type {object}
 * @description defines prop types of Icon
 * @property {string}         name            - name of the icon, it should be exist in font icon pack
 * @property {number}         [size]          - size of the icon
 * @property {string}         [className]     - class name of the icon
 */
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

/**
 * @memberOf components.Globals.Icon
 * @name defaultProps
 * @type {object}
 * @description defines default props of Icon
 * @property {number}         [size]          - defines default size of the icon
 * @property {string}         [className]     - defines default class name of the icon
 */
Icon.defaultProps = {
  size: 1,
  className: '',
};
/**
 * @memberOf components.Globals.Icon
 * @export Icon
 * @description exports Icon module.
 */
export default Icon;
