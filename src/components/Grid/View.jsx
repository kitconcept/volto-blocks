import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import cx from 'classnames';
import { BlockWrapperEnhancer } from '@kitconcept/volto-blocks/components';

const View = ({ data, render, path }) => {
  return (
    <BlockWrapperEnhancer data={data}>
      <div
        className={cx('block __grid', {
          [data['@type']]: true,
          [data.variation]: data.variation,
          centered: data.align === 'center' || data.align === undefined,
          'space-between': data.align === 'space-between',
          'centered-text': data.centeredText,
          one: data.columns.length === 1,
          two: data.columns.length === 2,
          three: data.columns.length === 3,
          four: data.columns.length === 4,
        })}
      >
        <Grid stackable columns={data.columns.length}>
          {data.columns.map((column) => (
            <Grid.Column key={column.id}>
              {render({ ...column, block: column.id }, path, data.columns)}
            </Grid.Column>
          ))}
        </Grid>
      </div>
    </BlockWrapperEnhancer>
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
