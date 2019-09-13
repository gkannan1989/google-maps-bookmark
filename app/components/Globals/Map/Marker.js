/**
 * @memberOf components.Globals.Map
 * @namespace components.Globals.Map.Marker
 */
import React from 'react';

import { StyledMarkerWrapper } from './styles';
import markerIcon from '../../../resources/images/marker-icon.png';

/**
 * function represents a Map component
 * @memberOf components.Globals.Map.Marker
 * @function Marker
 * @description
 * renders a Marker for map
 * @return {jsx} - jsx component to show
 * @example
 * <Marker />
 */
const Marker = () => (
  <StyledMarkerWrapper>
    <img src={markerIcon} alt="" />
  </StyledMarkerWrapper>
);

/**
 * @memberOf components.Globals.Map.Marker
 * @export Marker
 * @description exports Marker module.
 */
export default Marker;
