import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import cx from 'classnames';

const View = ({ data, render }) => {
  return (
    <div
      className={cx('block __grid', {
        centered: data.align === 'center' || data.align === undefined,
        'space-between': data.align === 'space-between',
        'centered-text': data.centeredText,
      })}
    >
      <Grid stackable columns={data.columns.length}>
        {data.columns.map(column => (
          <Grid.Column key={column.id}>{render(column)}</Grid.Column>
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
