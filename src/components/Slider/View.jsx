/**
 * View image tile.
 * @module components/manage/Tiles/Slider/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import cx from 'classnames';
import { settings } from '~/config';
import Slider from 'react-slick';

import slider1 from '../../static/slider1.jpg';
import slider2 from '../../static/slider2.jpg';
import slider3 from '../../static/slider3.jpg';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <Slider
    customPaging={dot => <div />}
    dots={true}
    dotsClass="slick-dots slick-thumb"
    infinite
    speed={500}
    slidesToShow={1}
    slidesToScroll={1}
    arrows={false}
  >
    <div>
      <div
        className="slide slide1"
        style={{
          background: `linear-gradient(to bottom, rgba(8, 7, 7, 0.57) 0%, rgba(238, 238, 238, 0) 35%, transparent 100%), url(${slider1}) no-repeat`,
          backgroundSize: 'cover',
        }}
      />
    </div>
    <div>
      <div
        className="slide slide2"
        style={{
          background: `linear-gradient(to bottom, rgba(8, 7, 7, 0.57) 0%, rgba(238, 238, 238, 0) 35%, transparent 100%), url(${slider2}) no-repeat`,
          backgroundSize: 'cover',
        }}
      />
    </div>
    <div>
      <div
        className="slide slide3"
        style={{
          background: `linear-gradient(to bottom, rgba(8, 7, 7, 0.57) 0%, rgba(238, 238, 238, 0) 35%, transparent 100%), url(${slider3}) no-repeat`,
          backgroundSize: 'cover',
        }}
      />
    </div>
  </Slider>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
