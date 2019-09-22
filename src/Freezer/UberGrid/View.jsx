/**
 * View image tile.
 * @module components/manage/Tiles/Slider/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import cx from 'classnames';
import { TileRenderer } from '../../components';

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  const isDoubleSized = data.columns.filter(cols => cols.x2).length;

  return (
    <div
      className={cx('tile __grid', {
        centered: data.align === 'center' || data.align === undefined,
        'space-between': data.align === 'space-between',
        'centered-text': data.centeredText,
      })}
    >
      <Grid
        className={cx({
          centered: data.align === 'center' || data.align === undefined,
          'space-between': data.align === 'space-between',
        })}
        columns={data.columns.length}
      >
        {data.columns.map(column => (
          <Grid.Column
            key={column.id}
            width={
              isDoubleSized
                ? column.x2
                  ? (12 / (data.columns.length + isDoubleSized)) * 2
                  : 12 / (data.columns.length + isDoubleSized)
                : null
            }
          >
            <TileRenderer
              tile={column.id}
              edit={false}
              type={column['@type']}
              data={column}
            />
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
