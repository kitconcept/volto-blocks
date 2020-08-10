import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import cx from 'classnames';

const View = ({ data, render, path }) => {
  const { cards } = data;
  return (
    <div
      className={cx('block __grid', {
        [data['@type']]: true,
        centered: data.align === 'center' || data.align === undefined,
        'space-between': data.align === 'space-between',
        'centered-text': data.centeredText,
        one: cards.columns.length === 1,
        two: cards.columns.length === 2,
        three: cards.columns.length === 3,
        four: cards.columns.length === 4,
      })}
    >
      <Grid stackable columns={cards.columns.length}>
        {cards.columns.map(column => (
          <Grid.Column key={column.id}>
            {render({ ...column, block: column.id }, path, cards.columns)}
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
  render: PropTypes.func.isRequired,
};

export default View;
