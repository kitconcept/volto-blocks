/**
 * View image tile.
 * @module components/manage/Tiles/Slider/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';
import redraft from 'redraft';
import cx from 'classnames';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';
import { TileRenderer } from '../../components';
import { closestIndexTo } from 'date-fns';

const getCardsLenght = cards =>
  cards.length + cards.filter(item => item.x2).length;

/**
 * View image tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div
    className={cx('tile cards', {
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
      columns={data.expandCards ? getCardsLenght(data.columns) : 4}
    >
      {data.columns.map(column => (
        <Grid.Column
          key={column.id}
          className={cx({
            x2: column['x2'],
          })}
        >
          <TileRenderer
            tile={column.id}
            edit={false}
            type="text"
            data={column}
          />
        </Grid.Column>
      ))}
    </Grid>
  </div>
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
