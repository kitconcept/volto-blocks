/**
 * View image tile.
 * @module components/manage/Tiles/Slider/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import cx from 'classnames';

import TeaserItem from './TeaserItem';
import ImageItem from './ImageItem';

export const gridConfig = {
  teaser: TeaserItem,
  image: ImageItem,
};

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  return (
    <div
      className={cx('tile __grid', {
        centered: data.align === 'center' || data.align === undefined,
        'space-between': data.align === 'space-between',
        'centered-text': data.centeredText,
      })}
    >
      <Grid columns={data.columns.length}>
        {data.columns.map(column => (
          <Grid.Column key={column.id}>
            {(() => {
              const GridTypeComponent = gridConfig[column['@type']];
              return <GridTypeComponent data={column} />;
            })()}
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
